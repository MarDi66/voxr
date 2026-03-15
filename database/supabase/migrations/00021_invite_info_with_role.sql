-- Extend invite lookup to also return the role granted by the invite,
-- so the onboarding UI can display it before the user joins.
-- Replaces get_workspace_name_by_invite with get_invite_info.

DROP FUNCTION IF EXISTS get_workspace_name_by_invite(text);

CREATE TYPE invite_info AS (
  workspace_name text,
  role           text
);

CREATE FUNCTION get_invite_info(p_token_hash text)
RETURNS invite_info
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT w.name, i.role
  FROM workspace_invites i
  JOIN workspaces w ON w.id = i.workspace_id
  WHERE i.token_hash = p_token_hash
    AND i.status = 'active'
    AND (i.expires_at IS NULL OR i.expires_at > now())
    AND auth.uid() IS NOT NULL
  LIMIT 1;
$$;
