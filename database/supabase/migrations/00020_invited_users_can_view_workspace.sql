-- Secure function to look up a workspace name by invite token hash.
-- Uses SECURITY DEFINER to bypass RLS on the workspaces table, since the
-- invited user is not yet a member and cannot SELECT from workspaces.
-- Requires the caller to be authenticated.

-- Secure function to look up a workspace name by invite token hash.
-- Uses SECURITY DEFINER to bypass RLS on the workspaces table, since the
-- invited user is not yet a member and cannot SELECT from workspaces.
-- Requires the caller to be authenticated.

CREATE OR REPLACE FUNCTION get_workspace_name_by_invite(p_token_hash text)
RETURNS text
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT w.name
  FROM workspace_invites i
  JOIN workspaces w ON w.id = i.workspace_id
  WHERE i.token_hash = p_token_hash
    AND i.status = 'active'
    AND (i.expires_at IS NULL OR i.expires_at > now())
    AND auth.uid() IS NOT NULL
  LIMIT 1;
$$;
