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

  return { data: data || [] };
}
