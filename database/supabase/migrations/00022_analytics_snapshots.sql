-- Daily analytics snapshots for yearly trend graphs.
-- Stores team_members, response_rate, psychological_safety, total_feedback
-- per workspace per day. Populated by a cron job calling
-- compute_daily_analytics_snapshots().

-- Table -------------------------------------------------------------------

CREATE TABLE analytics_snapshots (
  id                    uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id          uuid        NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  snapshot_date         date        NOT NULL,
  team_members          integer     NOT NULL DEFAULT 0,
  response_rate         integer     NOT NULL DEFAULT 0,
  psychological_safety  integer     NOT NULL DEFAULT 0,
  total_feedback        integer     NOT NULL DEFAULT 0,
  created_at            timestamptz NOT NULL DEFAULT now(),

  UNIQUE (workspace_id, snapshot_date)
);

CREATE INDEX idx_analytics_snapshots_workspace_date
  ON analytics_snapshots (workspace_id, snapshot_date DESC);

-- RLS ---------------------------------------------------------------------

ALTER TABLE analytics_snapshots ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Workspace admins can view analytics snapshots"
  ON analytics_snapshots
  FOR SELECT
  TO authenticated
  USING (is_workspace_admin(workspace_id));

-- Function ----------------------------------------------------------------

CREATE FUNCTION compute_daily_analytics_snapshots()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  w RECORD;
  v_date date := CURRENT_DATE;
  v_team_members integer;
  v_total_feedback integer;
  v_items_with_comments integer;
  v_response_rate integer;
  v_categories_used integer;
  v_concerns integer;
  v_concern_ratio numeric;
  v_category_diversity numeric;
  v_concern_balance numeric;
  v_psychological_safety integer;
BEGIN
  FOR w IN SELECT id FROM workspaces LOOP
    -- Team members (active)
    SELECT COUNT(*)
      INTO v_team_members
      FROM workspace_members
     WHERE workspace_id = w.id
       AND status = 'active';

    -- Total feedback
    SELECT COUNT(*)
      INTO v_total_feedback
      FROM feedback_items
     WHERE workspace_id = w.id;

    -- Response rate: % of items that received at least one comment
    IF v_total_feedback > 0 THEN
      SELECT COUNT(DISTINCT fi.id)
        INTO v_items_with_comments
        FROM feedback_items fi
        JOIN comments c ON c.item_id = fi.id
       WHERE fi.workspace_id = w.id;

      v_response_rate := ROUND((v_items_with_comments::numeric / v_total_feedback) * 100);
    ELSE
      v_response_rate := 0;
    END IF;

    -- Psychological safety
    -- Mirrors TypeScript logic: categoryDiversity * 50 + concernBalance * 50
    IF v_total_feedback > 0 THEN
      SELECT COUNT(DISTINCT category)
        INTO v_categories_used
        FROM feedback_items
       WHERE workspace_id = w.id;

      SELECT COUNT(*)
        INTO v_concerns
        FROM feedback_items
       WHERE workspace_id = w.id
         AND category = 'concern';

      v_category_diversity := v_categories_used::numeric / 4;
      v_concern_ratio := v_concerns::numeric / v_total_feedback;

      IF v_concern_ratio >= 0.15 AND v_concern_ratio <= 0.35 THEN
        v_concern_balance := 1.0;
      ELSIF v_concerns > 0 THEN
        v_concern_balance := 0.6;
      ELSE
        v_concern_balance := 0.3;
      END IF;

      v_psychological_safety := ROUND(v_category_diversity * 50 + v_concern_balance * 50);
    ELSE
      -- No feedback: category_diversity=0 → 0*50=0, concerns=0 → 0.3*50=15
      v_psychological_safety := 15;
    END IF;

    -- Upsert snapshot
    INSERT INTO analytics_snapshots
      (workspace_id, snapshot_date, team_members, response_rate, psychological_safety, total_feedback)
    VALUES
      (w.id, v_date, v_team_members, v_response_rate, v_psychological_safety, v_total_feedback)
    ON CONFLICT (workspace_id, snapshot_date)
    DO UPDATE SET
      team_members         = EXCLUDED.team_members,
      response_rate        = EXCLUDED.response_rate,
      psychological_safety = EXCLUDED.psychological_safety,
      total_feedback       = EXCLUDED.total_feedback;
  END LOOP;
END;
$$;
