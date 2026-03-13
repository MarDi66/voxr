-- Prevent duplicate reports: a user cannot report the same target twice
alter table reports
  add constraint unique_report_per_user_target unique (reporter_id, target_id, target_type);

-- RPC: return aggregated report info for a list of targets
-- Returns report_count and whether the calling user has already reported each target.
-- Uses security definer so any authenticated member can call it without
-- needing SELECT access on the reports table.
create or replace function get_reports_summary(target_ids uuid[])
returns table(target_id uuid, report_count bigint, has_reported boolean)
language sql
security definer
stable
as $$
  select
    r.target_id,
    count(*)::bigint as report_count,
    bool_or(r.reporter_id = auth.uid()) as has_reported
  from reports r
  where r.target_id = any(target_ids)
    and r.status = 'pending'
  group by r.target_id;
$$;
