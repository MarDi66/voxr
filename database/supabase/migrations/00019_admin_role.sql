-- Migration: Add admin role
-- Admins can do everything owners can except transfer ownership and delete workspace.
-- ============================================================================

-- 1. Expand role constraints to include 'admin'
ALTER TABLE workspace_members DROP CONSTRAINT workspace_members_role_check;
ALTER TABLE workspace_members ADD CONSTRAINT workspace_members_role_check
  CHECK (role IN ('owner', 'admin', 'member'));

ALTER TABLE workspace_invites DROP CONSTRAINT workspace_invites_role_check;
ALTER TABLE workspace_invites ADD CONSTRAINT workspace_invites_role_check
  CHECK (role IN ('admin', 'member'));

-- 2. Update is_workspace_admin helper to include both owner and admin
CREATE OR REPLACE FUNCTION is_workspace_admin(wid uuid)
RETURNS boolean LANGUAGE sql SECURITY DEFINER STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM workspace_members
    WHERE workspace_id = wid
      AND user_id = auth.uid()
      AND role IN ('owner', 'admin')
      AND status = 'active'
  );
$$;

-- 3. Update set_item_status to allow admin
CREATE OR REPLACE FUNCTION set_item_status(p_item_id uuid, p_status text)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER
AS $$
BEGIN
  IF p_status NOT IN ('published', 'hidden') THEN
    RAISE EXCEPTION 'Invalid status: %', p_status;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM workspace_members wm
    JOIN feedback_items fi ON fi.workspace_id = wm.workspace_id
    WHERE fi.id = p_item_id
      AND wm.user_id = auth.uid()
      AND wm.role IN ('owner', 'admin')
      AND wm.status = 'active'
  ) THEN
    RAISE EXCEPTION 'Only workspace owners and admins can change item status';
  END IF;

  UPDATE feedback_items SET status = p_status WHERE id = p_item_id;
END;
$$;

-- 4. Update set_comment_status to allow admin
CREATE OR REPLACE FUNCTION set_comment_status(p_comment_id uuid, p_status text)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER
AS $$
BEGIN
  IF p_status NOT IN ('published', 'hidden') THEN
    RAISE EXCEPTION 'Invalid status: %', p_status;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM workspace_members wm
    JOIN comments c ON c.workspace_id = wm.workspace_id
    WHERE c.id = p_comment_id
      AND wm.user_id = auth.uid()
      AND wm.role IN ('owner', 'admin')
      AND wm.status = 'active'
  ) THEN
    RAISE EXCEPTION 'Only workspace owners and admins can change comment status';
  END IF;

  UPDATE comments SET status = p_status WHERE id = p_comment_id;
END;
$$;

-- 5. Update toggle_flag_item to allow admin
CREATE OR REPLACE FUNCTION toggle_flag_item(p_workspace_id uuid, p_item_id uuid)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER
AS $$
DECLARE
  v_currently_flagged boolean;
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM workspace_members
    WHERE workspace_id = p_workspace_id
      AND user_id = auth.uid()
      AND role IN ('owner', 'admin')
      AND status = 'active'
  ) THEN
    RAISE EXCEPTION 'Only workspace owners and admins can flag items';
  END IF;

  SELECT is_flagged INTO v_currently_flagged
  FROM feedback_items
  WHERE id = p_item_id AND workspace_id = p_workspace_id;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Item not found in this workspace';
  END IF;

  IF v_currently_flagged THEN
    UPDATE feedback_items SET is_flagged = false WHERE id = p_item_id;
  ELSE
    UPDATE feedback_items SET is_flagged = false
    WHERE workspace_id = p_workspace_id AND is_flagged = true;
    UPDATE feedback_items SET is_flagged = true WHERE id = p_item_id;
  END IF;
END;
$$;

-- 6. transfer_ownership stays owner-only (no change needed, already checks role = 'owner')
-- 7. Workspace delete policy already uses is_workspace_admin, but we want delete to remain
--    owner-only. So we replace the delete policy to check owner explicitly.
DROP POLICY IF EXISTS "Owners can delete workspaces" ON workspaces;
CREATE POLICY "Owners can delete workspaces"
  ON workspaces FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM workspace_members
      WHERE workspace_id = id
        AND user_id = auth.uid()
        AND role = 'owner'
        AND status = 'active'
    )
  );

-- 8. Allow admins to delete (remove) members too
DROP POLICY IF EXISTS "Owners can delete members" ON workspace_members;
CREATE POLICY "Owners and admins can delete members"
  ON workspace_members FOR DELETE
  USING (is_workspace_admin(workspace_id));

-- 9. Allow admins to update members (for status changes like removal)
DROP POLICY IF EXISTS "Owners can update members" ON workspace_members;
CREATE POLICY "Owners and admins can update members"
  ON workspace_members FOR UPDATE
  USING (is_workspace_admin(workspace_id));
