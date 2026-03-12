-- Migration: Create core tables, helper functions, triggers, and RLS policies
-- ============================================================================

-- 1. Tables
-- ============================================================================

-- workspaces
create table workspaces (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  created_by uuid not null,
  created_at timestamptz default now(),
  auto_join_enabled boolean default false
);

-- workspace_members
create table workspace_members (
  workspace_id uuid not null references workspaces(id) on delete cascade,
  user_id uuid not null,
  role text not null check (role in ('admin', 'member')),
  status text not null check (status in ('active', 'invited', 'left')),
  joined_at timestamptz default now(),
  primary key (workspace_id, user_id)
);

-- workspace_invites
create table workspace_invites (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references workspaces(id) on delete cascade,
  token_hash text not null,
  invited_email text null,
  role text not null default 'member' check (role in ('admin', 'member')),
  created_by uuid not null,
  created_at timestamptz default now(),
  expires_at timestamptz null,
  used_at timestamptz null,
  used_by uuid null
);

-- workspace_domains (optional)
create table workspace_domains (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references workspaces(id) on delete cascade,
  domain text not null,
  unique (workspace_id, domain)
);

-- feedback_items
create table feedback_items (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references workspaces(id) on delete cascade,
  author_id uuid not null,
  title text not null,
  body text not null,
  category text not null default 'idea' check (category in ('idea', 'concern', 'praise', 'question')),
  status text not null default 'published' check (status in ('published', 'hidden')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- comments
create table comments (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references workspaces(id) on delete cascade,
  item_id uuid not null references feedback_items(id) on delete cascade,
  author_id uuid not null,
  body text not null,
  status text not null default 'published' check (status in ('published', 'hidden')),
  created_at timestamptz default now()
);

-- reactions
create table reactions (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references workspaces(id) on delete cascade,
  target_type text not null check (target_type in ('item', 'comment')),
  target_id uuid not null,
  user_id uuid not null,
  emoji text not null,
  created_at timestamptz default now(),
  unique (target_type, target_id, user_id, emoji)
);

-- reports
create table reports (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references workspaces(id) on delete cascade,
  target_type text not null check (target_type in ('item', 'comment')),
  target_id uuid not null,
  reporter_id uuid not null,
  reason text null,
  status text not null default 'pending' check (status in ('pending', 'resolved', 'dismissed')),
  created_at timestamptz default now()
);

-- 2. Helper functions
-- ============================================================================

create or replace function is_workspace_member(wid uuid)
returns boolean
language sql
security definer
stable
as $$
  select exists (
    select 1 from workspace_members
    where workspace_id = wid
      and user_id = auth.uid()
      and status = 'active'
  );
$$;

create or replace function is_workspace_admin(wid uuid)
returns boolean
language sql
security definer
stable
as $$
  select exists (
    select 1 from workspace_members
    where workspace_id = wid
      and user_id = auth.uid()
      and role = 'admin'
      and status = 'active'
  );
$$;

-- 3. Indexes
-- ============================================================================

create index idx_workspace_members_user on workspace_members(user_id);
create index idx_workspace_members_workspace on workspace_members(workspace_id);
create index idx_feedback_items_workspace on feedback_items(workspace_id);
create index idx_feedback_items_category on feedback_items(workspace_id, category);
create index idx_comments_item on comments(item_id);
create index idx_comments_workspace on comments(workspace_id);
create index idx_reactions_target on reactions(target_type, target_id);
create index idx_reactions_workspace on reactions(workspace_id);
create index idx_reports_workspace on reports(workspace_id);
create index idx_workspace_invites_token on workspace_invites(token_hash);
create index idx_workspace_invites_workspace on workspace_invites(workspace_id);

-- 4. Triggers
-- ============================================================================

-- Auto-set author_id on feedback_items insert
create or replace function set_feedback_author()
returns trigger
language plpgsql
security definer
as $$
begin
  new.author_id := auth.uid();
  return new;
end;
$$;

create trigger trg_feedback_set_author
  before insert on feedback_items
  for each row
  execute function set_feedback_author();

-- Auto-set author_id on comments insert
create or replace function set_comment_author()
returns trigger
language plpgsql
security definer
as $$
begin
  new.author_id := auth.uid();
  return new;
end;
$$;

create trigger trg_comment_set_author
  before insert on comments
  for each row
  execute function set_comment_author();

-- Auto-update updated_at on feedback_items update
create or replace function set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

create trigger trg_feedback_updated_at
  before update on feedback_items
  for each row
  execute function set_updated_at();

-- 5. Enable RLS on all tables
-- ============================================================================

alter table workspaces enable row level security;
alter table workspace_members enable row level security;
alter table workspace_invites enable row level security;
alter table workspace_domains enable row level security;
alter table feedback_items enable row level security;
alter table comments enable row level security;
alter table reactions enable row level security;
alter table reports enable row level security;

-- 6. RLS Policies
-- ============================================================================

-- workspaces policies
create policy "Members can view their workspaces"
  on workspaces for select
  using (is_workspace_member(id));

create policy "Authenticated users can create workspaces"
  on workspaces for insert
  with check (auth.uid() is not null);

create policy "Admins can update their workspaces"
  on workspaces for update
  using (is_workspace_admin(id));

-- workspace_members policies
create policy "Admins can view all members"
  on workspace_members for select
  using (is_workspace_admin(workspace_id));

create policy "Members can view themselves"
  on workspace_members for select
  using (user_id = auth.uid());

create policy "Authenticated users can insert membership"
  on workspace_members for insert
  with check (auth.uid() is not null);

create policy "Admins can update members"
  on workspace_members for update
  using (is_workspace_admin(workspace_id));

create policy "Members can leave (update own status)"
  on workspace_members for update
  using (user_id = auth.uid())
  with check (status = 'left');

-- workspace_invites policies
create policy "Admins can manage invites"
  on workspace_invites for all
  using (is_workspace_admin(workspace_id));

create policy "Anyone authenticated can read invites by token"
  on workspace_invites for select
  using (auth.uid() is not null);

-- workspace_domains policies
create policy "Admins can manage domains"
  on workspace_domains for all
  using (is_workspace_admin(workspace_id));

create policy "Members can view domains"
  on workspace_domains for select
  using (is_workspace_member(workspace_id));

-- feedback_items policies
create policy "Members can view published items"
  on feedback_items for select
  using (
    is_workspace_member(workspace_id)
    and (status = 'published' or is_workspace_admin(workspace_id))
  );

create policy "Members can create items"
  on feedback_items for insert
  with check (is_workspace_member(workspace_id));

create policy "Authors can update own items"
  on feedback_items for update
  using (author_id = auth.uid());

create policy "Admins can update any item"
  on feedback_items for update
  using (is_workspace_admin(workspace_id));

create policy "Authors can delete own items"
  on feedback_items for delete
  using (author_id = auth.uid());

-- comments policies
create policy "Members can view published comments"
  on comments for select
  using (
    is_workspace_member(workspace_id)
    and (status = 'published' or is_workspace_admin(workspace_id))
  );

create policy "Members can create comments"
  on comments for insert
  with check (is_workspace_member(workspace_id));

create policy "Authors can update own comments"
  on comments for update
  using (author_id = auth.uid());

create policy "Admins can update any comment"
  on comments for update
  using (is_workspace_admin(workspace_id));

create policy "Authors can delete own comments"
  on comments for delete
  using (author_id = auth.uid());

-- reactions policies
create policy "Members can view reactions"
  on reactions for select
  using (is_workspace_member(workspace_id));

create policy "Members can add reactions"
  on reactions for insert
  with check (
    is_workspace_member(workspace_id)
    and user_id = auth.uid()
  );

create policy "Users can remove own reactions"
  on reactions for delete
  using (user_id = auth.uid());

-- reports policies
create policy "Members can create reports"
  on reports for insert
  with check (
    is_workspace_member(workspace_id)
    and reporter_id = auth.uid()
  );

create policy "Admins can view reports"
  on reports for select
  using (is_workspace_admin(workspace_id));

create policy "Admins can update reports"
  on reports for update
  using (is_workspace_admin(workspace_id));
