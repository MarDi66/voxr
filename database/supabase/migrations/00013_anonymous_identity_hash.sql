-- Add author_context_hash to safe views for anonymous identity generation.
-- The hash is derived from (author_id, item context) so:
--   • Same user on same feedback → same hash
--   • Same user on different feedback → different hash
--   • Hash cannot be reversed to reveal author_id

CREATE OR REPLACE VIEW feedback_items_safe AS
SELECT
  id,
  workspace_id,
  title,
  body,
  category,
  status,
  created_at,
  updated_at,
  (author_id = auth.uid()) AS is_own,
  is_flagged,
  md5(author_id::text || '::' || id::text) AS author_context_hash
FROM feedback_items;

CREATE OR REPLACE VIEW comments_safe AS
SELECT
  c.id,
  c.workspace_id,
  c.item_id,
  c.body,
  c.status,
  c.created_at,
  (c.author_id = auth.uid()) AS is_own,
  (c.author_id = fi.author_id) AS is_item_author,
  md5(c.author_id::text || '::' || c.item_id::text) AS author_context_hash
FROM comments c
JOIN feedback_items fi ON fi.id = c.item_id;
