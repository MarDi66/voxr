-- Migration: Anonymity hardening
-- Revoke direct SELECT on author_id columns and create safe read views
-- ============================================================================

-- 1. Revoke column-level SELECT on author_id
-- ============================================================================
-- Note: We use views to control what columns are exposed.
-- The anon and authenticated roles should query through views.

-- 2. Safe read views (omit author_id for normal queries)
-- ============================================================================

-- Safe view for feedback items (no author_id exposed)
create or replace view feedback_items_safe as
select
  id,
  workspace_id,
  title,
  body,
  category,
  status,
  created_at,
  updated_at,
  -- Allow users to know if they own an item without revealing author_id
  (author_id = auth.uid()) as is_own
from feedback_items;

-- Safe view for comments (no author_id exposed)
create or replace view comments_safe as
select
  id,
  workspace_id,
  item_id,
  body,
  status,
  created_at,
  (author_id = auth.uid()) as is_own
from comments;

-- 3. Grant access to views instead of base tables for reads
-- ============================================================================
-- The RLS on the underlying tables still applies when querying views.
-- Views inherit the RLS policies of their base tables.

-- Grant select on safe views to authenticated users
grant select on feedback_items_safe to authenticated;
grant select on comments_safe to authenticated;

-- Revoke direct select on author_id from authenticated role
-- (Keep select on other columns)
revoke all on feedback_items from anon;
revoke all on comments from anon;

-- For authenticated: grant all columns except author_id for select
-- We achieve this by revoking select on the whole table and re-granting specific columns
revoke select on feedback_items from authenticated;
grant select (id, workspace_id, title, body, category, status, created_at, updated_at) on feedback_items to authenticated;
grant insert, update, delete on feedback_items to authenticated;

revoke select on comments from authenticated;
grant select (id, workspace_id, item_id, body, status, created_at) on comments to authenticated;
grant insert, update, delete on comments to authenticated;
