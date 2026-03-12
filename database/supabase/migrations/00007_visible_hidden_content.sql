-- Migration: Allow members to see hidden items and comments
-- Hidden content is displayed in the UI with a blur placeholder.
-- ============================================================================

-- 1. Update feedback_items RLS: members can see all items (including hidden)
-- ============================================================================

DROP POLICY "Members can view published items" ON feedback_items;

CREATE POLICY "Members can view items"
  ON feedback_items FOR SELECT
  USING (is_workspace_member(workspace_id));

-- 2. Update comments RLS: members can see all comments (including hidden)
-- ============================================================================

DROP POLICY "Members can view published comments" ON comments;

CREATE POLICY "Members can view comments"
  ON comments FOR SELECT
  USING (is_workspace_member(workspace_id));
