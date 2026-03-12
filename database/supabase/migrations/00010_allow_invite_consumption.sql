-- Allow any authenticated user to mark an active invite as used.
-- Without this policy, the RLS "Admins can manage invites" (FOR ALL)
-- blocks the UPDATE because the consuming user is not yet a workspace owner.

CREATE POLICY "Authenticated users can consume invites"
  ON workspace_invites FOR UPDATE
  USING  (auth.uid() IS NOT NULL AND status = 'active')
  WITH CHECK (status = 'used');
