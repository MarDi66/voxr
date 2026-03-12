-- Migration: Add is_item_author flag to comments_safe view
-- Allows the UI to subtly flag comments made by the feedback item's creator
-- without revealing their identity.
-- ============================================================================

DROP VIEW IF EXISTS comments_safe;

CREATE VIEW comments_safe AS
SELECT
  c.id,
  c.workspace_id,
  c.item_id,
  c.body,
  c.status,
  c.created_at,
  (c.author_id = auth.uid()) AS is_own,
  (c.author_id = fi.author_id) AS is_item_author
FROM comments c
JOIN feedback_items fi ON fi.id = c.item_id;

GRANT SELECT ON comments_safe TO authenticated;
