"use server";

import { createClient } from "@/lib/supabase/server";
import { toggleReactionSchema } from "@/lib/validators/feedback";

export async function toggleReaction(input: {
  workspaceId: string;
  targetType: "item" | "comment";
  targetId: string;
  emoji: string;
}) {
  const parsed = toggleReactionSchema.safeParse(input);
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

  // Check if reaction already exists
  const { data: existing } = await supabase
    .from("reactions")
    .select("id")
    .eq("target_type", parsed.data.targetType)
    .eq("target_id", parsed.data.targetId)
    .eq("user_id", user.id)
    .eq("emoji", parsed.data.emoji)
    .single();

  if (existing) {
    // Remove reaction
    const { error } = await supabase
      .from("reactions")
      .delete()
      .eq("id", existing.id);

    if (error) {
      return { error: error.message };
    }
    return { success: true, action: "removed" as const };
  }

  // Add reaction
  const { error } = await supabase.from("reactions").insert({
    workspace_id: parsed.data.workspaceId,
    target_type: parsed.data.targetType,
    target_id: parsed.data.targetId,
    user_id: user.id,
    emoji: parsed.data.emoji,
  });

  if (error) {
    return { error: error.message };
  }

  return { success: true, action: "added" as const };
}
