-- Migration: Forms feature (Typeform-like)
-- Owners can create forms, anyone can complete once, answers are anonymous
-- ============================================================================

-- 1. Tables
-- ============================================================================

-- forms
create table forms (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references workspaces(id) on delete cascade,
  created_by uuid not null,
  title text not null,
  description text,
  visibility text not null default 'public' check (visibility in ('public', 'private')),
  status text not null default 'published' check (status in ('published', 'closed')),
  created_at timestamptz default now()
);

-- form_questions
create table form_questions (
  id uuid primary key default gen_random_uuid(),
  form_id uuid not null references forms(id) on delete cascade,
  question_text text not null,
  question_type text not null check (question_type in ('short_text', 'long_text', 'single_choice', 'multiple_choice', 'rating')),
  options jsonb default '[]'::jsonb,
  position integer not null,
  required boolean not null default true
);

-- form_responses (one per user per form)
create table form_responses (
  id uuid primary key default gen_random_uuid(),
  form_id uuid not null references forms(id) on delete cascade,
  respondent_id uuid not null,
  created_at timestamptz default now(),
  unique (form_id, respondent_id)
);

-- form_answers
create table form_answers (
  id uuid primary key default gen_random_uuid(),
  response_id uuid not null references form_responses(id) on delete cascade,
  question_id uuid not null references form_questions(id) on delete cascade,
  answer_value text not null
);

-- 2. Triggers
-- ============================================================================

-- Auto-set created_by on forms insert
create or replace function set_form_creator()
returns trigger
language plpgsql
security definer
as $$
begin
  new.created_by := auth.uid();
  return new;
end;
$$;

create trigger trg_form_set_creator
  before insert on forms
  for each row
  execute function set_form_creator();

-- Auto-set respondent_id on form_responses insert
create or replace function set_form_respondent()
returns trigger
language plpgsql
security definer
as $$
begin
  new.respondent_id := auth.uid();
  return new;
end;
$$;

create trigger trg_form_response_set_respondent
  before insert on form_responses
  for each row
  execute function set_form_respondent();

-- 3. Safe views (anonymity)
-- ============================================================================

-- Safe view for form responses (no respondent_id exposed)
create or replace view form_responses_safe as
select
  id,
  form_id,
  created_at,
  (respondent_id = auth.uid()) as is_own
from form_responses;

grant select on form_responses_safe to authenticated;

-- 4. Indexes
-- ============================================================================

create index idx_forms_workspace on forms(workspace_id);
create index idx_form_questions_form on form_questions(form_id);
create index idx_form_responses_form on form_responses(form_id);
create index idx_form_answers_response on form_answers(response_id);
create index idx_form_answers_question on form_answers(question_id);

-- 5. Enable RLS
-- ============================================================================

alter table forms enable row level security;
alter table form_questions enable row level security;
alter table form_responses enable row level security;
alter table form_answers enable row level security;

-- 6. RLS Policies
-- ============================================================================

-- forms policies
create policy "Members can view published forms"
  on forms for select
  using (is_workspace_member(workspace_id));

create policy "Owners can create forms"
  on forms for insert
  with check (is_workspace_admin(workspace_id));

create policy "Owners can update forms"
  on forms for update
  using (is_workspace_admin(workspace_id));

-- form_questions policies
create policy "Members can view questions"
  on form_questions for select
  using (
    exists (
      select 1 from forms
      where forms.id = form_questions.form_id
        and is_workspace_member(forms.workspace_id)
    )
  );

create policy "Owners can manage questions"
  on form_questions for insert
  with check (
    exists (
      select 1 from forms
      where forms.id = form_questions.form_id
        and is_workspace_admin(forms.workspace_id)
    )
  );

-- form_responses policies
create policy "Members can insert own response"
  on form_responses for insert
  with check (
    exists (
      select 1 from forms
      where forms.id = form_responses.form_id
        and is_workspace_member(forms.workspace_id)
        and forms.status = 'published'
    )
  );

create policy "Members can view own responses"
  on form_responses for select
  using (respondent_id = auth.uid());

create policy "Owners can view all responses"
  on form_responses for select
  using (
    exists (
      select 1 from forms
      where forms.id = form_responses.form_id
        and is_workspace_admin(forms.workspace_id)
    )
  );

-- form_answers policies
create policy "Members can insert answers"
  on form_answers for insert
  with check (
    exists (
      select 1 from form_responses
      where form_responses.id = form_answers.response_id
        and form_responses.respondent_id = auth.uid()
    )
  );

create policy "Public form answers visible to members"
  on form_answers for select
  using (
    exists (
      select 1 from form_responses
      join forms on forms.id = form_responses.form_id
      where form_responses.id = form_answers.response_id
        and is_workspace_member(forms.workspace_id)
        and forms.visibility = 'public'
    )
  );

create policy "Private form answers visible to owner"
  on form_answers for select
  using (
    exists (
      select 1 from form_responses
      join forms on forms.id = form_responses.form_id
      where form_responses.id = form_answers.response_id
        and is_workspace_admin(forms.workspace_id)
    )
  );

create policy "Own answers always visible"
  on form_answers for select
  using (
    exists (
      select 1 from form_responses
      where form_responses.id = form_answers.response_id
        and form_responses.respondent_id = auth.uid()
    )
  );

-- Revoke direct select on respondent_id from form_responses
revoke select on form_responses from authenticated;
grant select (id, form_id, created_at) on form_responses to authenticated;
grant insert, delete on form_responses to authenticated;
