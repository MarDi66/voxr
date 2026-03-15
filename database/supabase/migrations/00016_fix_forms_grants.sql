-- Migration: Fix grants for forms tables
-- ============================================================================

-- Revoke all from anon
revoke all on forms from anon;
revoke all on form_questions from anon;
revoke all on form_responses from anon;
revoke all on form_answers from anon;

-- forms: owners can insert/update, members can select
grant select, insert, update on forms to authenticated;

-- form_questions: owners can insert, members can select
grant select, insert on form_questions to authenticated;

-- form_responses: hide respondent_id — only expose safe columns
revoke select on form_responses from authenticated;
grant select (id, form_id, created_at) on form_responses to authenticated;
grant insert, delete on form_responses to authenticated;

-- form_answers: members can insert/select (RLS controls visibility)
grant select, insert on form_answers to authenticated;
