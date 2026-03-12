-- Migration: Remove delete capabilities, restrict hiding
-- - Nobody can delete feedback items or comments
-- - Only the owner can hide feedback items, and only from the reports view
-- - Nobody can hide/delete comments (admin can still hide via setCommentStatus in moderation)
-- ============================================================================

-- 1. Drop delete policies
-- ============================================================================

DROP POLICY IF EXISTS "Authors can delete own items" ON feedback_items;
DROP POLICY IF EXISTS "Authors can delete own comments" ON comments;

-- 2. Revoke DELETE privilege on feedback_items and comments
-- ============================================================================

REVOKE DELETE ON feedback_items FROM authenticated;
REVOKE DELETE ON comments FROM authenticated;

-- 3. Drop author update policy on feedback_items (replace with content-only update)
--    Authors should only update title/body/category, NOT status.
--    Status changes (hide/unhide) are owner-only via is_workspace_admin.
-- ============================================================================

DROP POLICY IF EXISTS "Authors can update own items" ON feedback_items;

-- Authors can only update content fields, not status
CREATE POLICY "Authors can update own item content"
  ON feedback_items FOR UPDATE
  USING (author_id = auth.uid())
  WITH CHECK (status = (SELECT fi.status FROM feedback_items fi WHERE fi.id = id));

-- 4. Remove author update policy on comments
--    Nobody should be able to update/hide comments except admins (already covered)
-- ============================================================================

DROP POLICY IF EXISTS "Authors can update own comments" ON comments;
