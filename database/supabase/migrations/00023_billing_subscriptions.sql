-- Migration: Stripe-backed workspace billing
-- ============================================================================

create table billing_customers (
  user_id uuid primary key,
  stripe_customer_id text not null unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table billing_subscriptions (
  id uuid primary key default gen_random_uuid(),
  owner_user_id uuid not null,
  workspace_id uuid null references workspaces(id) on delete set null,
  stripe_customer_id text not null,
  stripe_subscription_id text not null unique,
  stripe_checkout_session_id text unique,
  plan_key text not null check (plan_key in ('pro', 'enterprise')),
  stripe_price_id text not null,
  status text not null,
  cancel_at_period_end boolean not null default false,
  current_period_start timestamptz null,
  current_period_end timestamptz null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_billing_subscriptions_owner
  on billing_subscriptions(owner_user_id);

create index idx_billing_subscriptions_workspace
  on billing_subscriptions(workspace_id);

create index idx_billing_subscriptions_status
  on billing_subscriptions(status);

create unique index idx_billing_active_subscription_per_workspace
  on billing_subscriptions(workspace_id)
  where workspace_id is not null
    and status in ('active', 'trialing', 'past_due');

create trigger trg_billing_customers_updated_at
  before update on billing_customers
  for each row
  execute function set_updated_at();

create trigger trg_billing_subscriptions_updated_at
  before update on billing_subscriptions
  for each row
  execute function set_updated_at();

create or replace function get_workspace_plan_key(wid uuid)
returns text
language sql
security definer
stable
set search_path = public
as $$
  select coalesce((
    select bs.plan_key
    from billing_subscriptions bs
    where bs.workspace_id = wid
      and bs.status in ('active', 'trialing', 'past_due')
      and (bs.current_period_end is null or bs.current_period_end >= now())
    order by bs.current_period_end desc nulls last, bs.created_at desc
    limit 1
  ), 'free');
$$;

create or replace function get_workspace_limit(wid uuid, metric text)
returns integer
language plpgsql
security definer
stable
set search_path = public
as $$
declare
  plan_key text;
begin
  plan_key := get_workspace_plan_key(wid);

  if metric = 'members' then
    return case plan_key
      when 'pro' then 10
      when 'enterprise' then 20
      else 2
    end;
  end if;

  if metric = 'feedback_items' then
    return case plan_key
      when 'pro' then 100
      when 'enterprise' then 500
      else 10
    end;
  end if;

  if metric = 'forms' then
    return case plan_key
      when 'pro' then 20
      when 'enterprise' then 50
      else 2
    end;
  end if;

  raise exception 'Unknown workspace billing metric: %', metric;
end;
$$;

create or replace function enforce_workspace_member_limit()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  current_count integer;
  max_allowed integer;
begin
  if new.status <> 'active' then
    return new;
  end if;

  if tg_op = 'INSERT' then
    select count(*)
    into current_count
    from workspace_members
    where workspace_id = new.workspace_id
      and status = 'active';
  else
    select count(*)
    into current_count
    from workspace_members
    where workspace_id = new.workspace_id
      and status = 'active'
      and user_id <> old.user_id;
  end if;

  max_allowed := get_workspace_limit(new.workspace_id, 'members');

  if current_count + 1 > max_allowed then
    raise exception 'BILLING_LIMIT_MEMBERS';
  end if;

  return new;
end;
$$;

create or replace function enforce_workspace_feedback_limit()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  current_count integer;
  max_allowed integer;
begin
  select count(*)
  into current_count
  from feedback_items
  where workspace_id = new.workspace_id;

  max_allowed := get_workspace_limit(new.workspace_id, 'feedback_items');

  if current_count + 1 > max_allowed then
    raise exception 'BILLING_LIMIT_FEEDBACK_ITEMS';
  end if;

  return new;
end;
$$;

create or replace function enforce_workspace_form_limit()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  current_count integer;
  max_allowed integer;
begin
  select count(*)
  into current_count
  from forms
  where workspace_id = new.workspace_id;

  max_allowed := get_workspace_limit(new.workspace_id, 'forms');

  if current_count + 1 > max_allowed then
    raise exception 'BILLING_LIMIT_FORMS';
  end if;

  return new;
end;
$$;

create trigger trg_workspace_member_limit
  before insert or update of status, workspace_id on workspace_members
  for each row
  execute function enforce_workspace_member_limit();

create trigger trg_feedback_limit
  before insert on feedback_items
  for each row
  execute function enforce_workspace_feedback_limit();

create trigger trg_forms_limit
  before insert on forms
  for each row
  execute function enforce_workspace_form_limit();

alter table billing_customers enable row level security;
alter table billing_subscriptions enable row level security;

create policy "Users can view own billing customer"
  on billing_customers for select
  using (user_id = auth.uid());

create policy "Users can insert own billing customer"
  on billing_customers for insert
  with check (user_id = auth.uid());

create policy "Users can update own billing customer"
  on billing_customers for update
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

create policy "Users can view relevant subscriptions"
  on billing_subscriptions for select
  using (
    owner_user_id = auth.uid()
    or (
      workspace_id is not null
      and exists (
        select 1 from workspace_members wm
        where wm.workspace_id = billing_subscriptions.workspace_id
          and wm.user_id = auth.uid()
          and wm.role = 'owner'
          and wm.status = 'active'
      )
    )
  );

create policy "Users can insert own subscriptions"
  on billing_subscriptions for insert
  with check (owner_user_id = auth.uid());

create policy "Users can update own subscriptions"
  on billing_subscriptions for update
  using (owner_user_id = auth.uid())
  with check (
    owner_user_id = auth.uid()
    and (
      workspace_id is null
      or exists (
        select 1 from workspace_members wm
        where wm.workspace_id = billing_subscriptions.workspace_id
          and wm.user_id = auth.uid()
          and wm.role = 'owner'
          and wm.status = 'active'
      )
    )
  );

revoke all on billing_customers from anon;
revoke all on billing_subscriptions from anon;
grant select, insert, update on billing_customers to authenticated;
grant select, insert, update on billing_subscriptions to authenticated;
