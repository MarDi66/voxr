-- Migration: RPC functions to set item/comment status (owner-only)
-- Direct table updates can be blocked by restrictive WITH CHECK policies.
-- Using SECURITY DEFINER RPCs ensures reliable status changes for owners.
-- ============================================================================

-- 1. RPC to set feedback item status (owner-only)
-- ============================================================================

CREATE OR REPLACE FUNCTION set_item_status(p_item_id uuid, p_status text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  IF p_status NOT IN ('published', 'hidden') THEN
    RAISE EXCEPTION 'Invalid status: %', p_status;
  END IF;

  -- Check caller is workspace owner for the item's workspace
  IF NOT EXISTS (
    SELECT 1 FROM workspace_members wm
    JOIN feedback_items fi ON fi.workspace_id = wm.workspace_id
    WHERE fi.id = p_item_id
      AND wm.user_id = auth.uid()
      AND wm.role = 'owner'
      AND wm.status = 'active'
  ) THEN
    RAISE EXCEPTION 'Only the workspace owner can change item status';
  END IF;

  UPDATE feedback_items SET status = p_status WHERE id = p_item_id;
END;
$$;

GRANT EXECUTE ON FUNCTION set_item_status TO authenticated;

-- 2. RPC to set comment status (owner-only)
-- ============================================================================

CREATE OR REPLACE FUNCTION set_comment_status(p_comment_id uuid, p_status text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  IF p_status NOT IN ('published', 'hidden') THEN
    RAISE EXCEPTION 'Invalid status: %', p_status;
  END IF;

  -- Check caller is workspace owner for the comment's workspace
  IF NOT EXISTS (
    SELECT 1 FROM workspace_members wm
    JOIN comments c ON c.workspace_id = wm.workspace_id
    WHERE c.id = p_comment_id
      AND wm.user_id = auth.uid()
      AND wm.role = 'owner'
      AND wm.status = 'active'
  ) THEN
    RAISE EXCEPTION 'Only the workspace owner can change comment status';
  END IF;

  UPDATE comments SET status = p_status WHERE id = p_comment_id;
END;
$$;

GRANT EXECUTE ON FUNCTION set_comment_status TO authenticated;
