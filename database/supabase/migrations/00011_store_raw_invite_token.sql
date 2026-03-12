-- Store the raw invite token so workspace owners can copy the invite link
-- at any time (until the invite expires or is consumed).
-- The token_hash column is kept for indexed lookups when consuming an invite.

ALTER TABLE workspace_invites ADD COLUMN token text;
