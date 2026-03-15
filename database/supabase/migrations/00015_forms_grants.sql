-- Migration: Fix missing table grants for forms feature
-- ============================================================================

-- Revoke all from anon (consistent with other tables)
revoke all on forms from anon;
revoke all on form_questions from anon;
revoke all on form_responses from anon;
revoke all on form_answers from anon;

-- Grant table-level permissions to authenticated role
grant select, insert, update on forms to authenticated;
grant select, insert on form_questions to authenticated;
grant select (id, form_id, created_at), insert, delete on form_responses to authenticated;
grant select, insert on form_answers to authenticated;
