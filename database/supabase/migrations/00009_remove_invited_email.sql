-- Remove the invited_email column from workspace_invites
alter table workspace_invites drop column if exists invited_email;
