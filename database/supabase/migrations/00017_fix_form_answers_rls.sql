-- Migration: Fix form_answers RLS policy
-- The insert policy on form_answers checks respondent_id on form_responses,
-- but respondent_id is hidden from authenticated role via column-level revoke.
-- Use a security definer helper function instead.
-- ============================================================================

-- Helper function to check if a form_response belongs to the current user
create or replace function is_own_form_response(rid uuid)
returns boolean
language sql
security definer
stable
as $$
  select exists (
    select 1 from form_responses
    where id = rid
      and respondent_id = auth.uid()
  );
$$;

grant execute on function is_own_form_response to authenticated;

-- Drop the old policy and recreate using the helper
drop policy if exists "Members can insert answers" on form_answers;

create policy "Members can insert answers"
  on form_answers for insert
  with check (is_own_form_response(response_id));

-- Also fix the "Own answers always visible" select policy
drop policy if exists "Own answers always visible" on form_answers;

create policy "Own answers always visible"
  on form_answers for select
  using (is_own_form_response(response_id));
