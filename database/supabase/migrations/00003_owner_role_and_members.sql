-- Migration: Owner role system, invite status column, members management
-- ============================================================================

-- 1. Update role values from 'admin' to 'owner'
-- ============================================================================

ALTER TABLE workspace_members DROP CONSTRAINT workspace_members_role_check;
ALTER TABLE workspace_members ADD CONSTRAINT workspace_members_role_check CHECK (role IN ('owner', 'member'));

UPDATE workspace_members SET role = 'owner' WHERE role = 'admin';

ALTER TABLE workspace_invites DROP CONSTRAINT workspace_invites_role_check;
ALTER TABLE workspace_invites ADD CONSTRAINT workspace_invites_role_check CHECK (role IN ('owner', 'member'));

UPDATE workspace_invites SET role = 'member' WHERE role = 'admin';

-- 2. Max 1 owner per workspace
-- ============================================================================

CREATE UNIQUE INDEX idx_workspace_one_owner
ON workspace_members (workspace_id)
WHERE role = 'owner';

-- 3. Update is_workspace_admin helper to check 'owner' role
-- ============================================================================

CREATE OR REPLACE FUNCTION is_workspace_admin(wid uuid)
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM workspace_members
    WHERE workspace_id = wid
      AND user_id = auth.uid()
      AND role = 'owner'
      AND status = 'active'
  );
$$;

-- 4. Add invite status column
-- ============================================================================

ALTER TABLE workspace_invites ADD COLUMN status text NOT NULL DEFAULT 'active'
  CHECK (status IN ('active', 'used', 'expired'));

UPDATE workspace_invites SET status = 'used' WHERE used_at IS NOT NULL;
UPDATE workspace_invites SET status = 'expired'
  WHERE expires_at IS NOT NULL AND expires_at < now() AND used_at IS NULL;

-- 5. Additional RLS policies
-- ============================================================================

CREATE POLICY "Members can view all workspace members"
  ON workspace_members FOR SELECT
  USING (is_workspace_member(workspace_id));

CREATE POLICY "Owners can delete members"
  ON workspace_members FOR DELETE
  USING (is_workspace_admin(workspace_id));

CREATE POLICY "Owners can delete workspaces"
  ON workspaces FOR DELETE
  USING (is_workspace_admin(id));

-- 6. get_workspace_members RPC (returns emails from auth.users)
-- ============================================================================

CREATE OR REPLACE FUNCTION get_workspace_members(wid uuid)
RETURNS TABLE(user_id uuid, email text, role text, status text, joined_at timestamptz)
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT wm.user_id, au.email, wm.role, wm.status, wm.joined_at
  FROM workspace_members wm
  JOIN auth.users au ON au.id = wm.user_id
  WHERE wm.workspace_id = wid
    AND wm.status = 'active'
    AND EXISTS (
      SELECT 1 FROM workspace_members
      WHERE workspace_id = wid
        AND user_id = auth.uid()
        AND status = 'active'
    );
$$;

GRANT EXECUTE ON FUNCTION get_workspace_members TO authenticated;

-- 7. transfer_ownership RPC (atomic owner transfer)
-- ============================================================================

CREATE OR REPLACE FUNCTION transfer_ownership(wid uuid, new_owner_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM workspace_members
    WHERE workspace_id = wid AND user_id = auth.uid() AND role = 'owner' AND status = 'active'
  ) THEN
    RAISE EXCEPTION 'Only the workspace owner can transfer ownership';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM workspace_members
    WHERE workspace_id = wid AND user_id = new_owner_id AND status = 'active'
  ) THEN
    RAISE EXCEPTION 'Target user is not an active member';
  END IF;

  UPDATE workspace_members SET role = 'member' WHERE workspace_id = wid AND user_id = auth.uid();
  UPDATE workspace_members SET role = 'owner' WHERE workspace_id = wid AND user_id = new_owner_id;
END;
$$;

GRANT EXECUTE ON FUNCTION transfer_ownership TO authenticated;
