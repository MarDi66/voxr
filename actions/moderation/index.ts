"use server";

import { createClient } from "@/lib/supabase/server";
import { reportTargetSchema } from "@/lib/validators/feedback";

export async function reportTarget(input: {
  workspaceId: string;
  targetType: "item" | "comment";
  targetId: string;
  reason?: string;
}) {
  const parsed = reportTargetSchema.safeParse(input);
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Not authenticated" };
  }

  const { error } = await supabase.from("reports").insert({
    workspace_id: parsed.data.workspaceId,
    target_type: parsed.data.targetType,
    target_id: parsed.data.targetId,
    reporter_id: user.id,
    reason: parsed.data.reason || null,
  });

  if (error) {
    if (error.code === "23505") {
      return { error: "You have already reported this content" };
    }
    return { error: error.message };
  }

  return { success: true };
}

export async function resolveReport(reportId: string, action: "resolved" | "dismissed") {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Not authenticated" };
  }

  const { error } = await supabase
    .from("reports")
    .update({ status: action })
    .eq("id", reportId);

  if (error) {
    return { error: error.message };
  }

  return { success: true };
}

export async function resolveReportsByTarget(
  targetType: "item" | "comment",
  targetId: string,
  action: "resolved" | "dismissed",
) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Not authenticated" };
  }

  const { error } = await supabase
    .from("reports")
    .update({ status: action })
    .eq("target_type", targetType)
    .eq("target_id", targetId)
    .eq("status", "pending");

  if (error) {
    return { error: error.message };
  }

  return { success: true };
}

export async function getReports(workspaceId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("reports")
    .select("*")
    .eq("workspace_id", workspaceId)
    .order("created_at", { ascending: false });

  if (error) {
    return { error: error.message, data: [] };
  }

  if (!data || data.length === 0) {
    return { data: [] };
  }

  // Enrich reports with target content previews
  const itemIds = data
    .filter((r) => r.target_type === "item")
    .map((r) => r.target_id);
  const commentIds = data
    .filter((r) => r.target_type === "comment")
    .map((r) => r.target_id);

  const [itemsResult, commentsResult] = await Promise.all([
    itemIds.length > 0
      ? supabase
          .from("feedback_items_safe")
          .select("id, title, body, category")
          .in("id", itemIds)
      : { data: [] },
    commentIds.length > 0
      ? supabase
          .from("comments_safe")
          .select("id, item_id, body")
          .in("id", commentIds)
      : { data: [] },
  ]);

  const itemsMap = new Map(
    (itemsResult.data || []).map((i) => [i.id, i])
  );
  const commentsMap = new Map(
    (commentsResult.data || []).map((c) => [c.id, c])
  );

  const enriched = data.map((report) => ({
    ...report,
    target_preview:
      report.target_type === "item"
        ? itemsMap.get(report.target_id) || null
        : commentsMap.get(report.target_id) || null,
  }));

  return { data: enriched };
}
