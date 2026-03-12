-- Migration: Flagged feedback feature
-- Only the workspace owner can flag one feedback item per workspace.
-- The flagged item is always displayed on top of the feed.
-- ============================================================================

-- 1. Add is_flagged column
-- ============================================================================

ALTER TABLE feedback_items ADD COLUMN is_flagged boolean NOT NULL DEFAULT false;

-- 2. Ensure at most one flagged item per workspace
-- ============================================================================

CREATE UNIQUE INDEX idx_one_flagged_per_workspace
ON feedback_items (workspace_id)
WHERE is_flagged = true;

-- 3. Recreate the safe view to include is_flagged
-- ============================================================================

DROP VIEW IF EXISTS feedback_items_safe;

CREATE VIEW feedback_items_safe AS
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
  is_flagged
FROM feedback_items;

-- Re-grant select on the recreated view
GRANT SELECT ON feedback_items_safe TO authenticated;

-- 4. Grant select on the new column
-- ============================================================================

GRANT SELECT (is_flagged) ON feedback_items TO authenticated;

-- 5. RPC to toggle flag atomically (owner-only)
-- ============================================================================

CREATE OR REPLACE FUNCTION toggle_flag_item(p_workspace_id uuid, p_item_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_currently_flagged boolean;
BEGIN
  -- Check caller is workspace owner
  IF NOT EXISTS (
    SELECT 1 FROM workspace_members
    WHERE workspace_id = p_workspace_id
      AND user_id = auth.uid()
      AND role = 'owner'
      AND status = 'active'
  ) THEN
    RAISE EXCEPTION 'Only the workspace owner can flag items';
  END IF;

  -- Check item belongs to workspace and get current flag state
  SELECT is_flagged INTO v_currently_flagged
  FROM feedback_items
  WHERE id = p_item_id AND workspace_id = p_workspace_id;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Item not found in this workspace';
  END IF;

  IF v_currently_flagged THEN
    -- Unflag
    UPDATE feedback_items SET is_flagged = false WHERE id = p_item_id;
  ELSE
    -- Unflag any currently flagged item in this workspace
    UPDATE feedback_items SET is_flagged = false
    WHERE workspace_id = p_workspace_id AND is_flagged = true;
    -- Flag the new item
    UPDATE feedback_items SET is_flagged = true WHERE id = p_item_id;
  END IF;
END;
$$;

GRANT EXECUTE ON FUNCTION toggle_flag_item TO authenticated;
