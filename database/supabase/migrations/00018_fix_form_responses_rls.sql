-- Migration: Fix form_responses RLS so members can see response counts
-- and public form answers from all users.
--
-- Problem: "Members can view own responses" policy restricts form_responses
-- to only the current user's rows (respondent_id = auth.uid()). This breaks:
--   1. Response counts for all forms (public and private)
--   2. Public form answers (the form_answers RLS policy joins to
--      form_responses, which is filtered to only the user's own rows)
--
-- Fix: Replace the restrictive policy with one that allows workspace members
-- to see all responses. Anonymity is preserved because respondent_id is
-- already hidden at the column level (migration 00016).
-- ============================================================================

-- Drop the overly restrictive policy
drop policy if exists "Members can view own responses" on form_responses;

-- Allow workspace members to see all responses (id, form_id, created_at only —
-- respondent_id is hidden via column-level grant revoke in 00016)
create policy "Members can view responses in workspace"
  on form_responses for select
  using (
    exists (
      select 1 from forms
      where forms.id = form_responses.form_id
        and is_workspace_member(forms.workspace_id)
    )
  );
