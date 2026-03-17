"use server";

import { createClient } from "@/lib/supabase/server";
import { encrypt } from "@/lib/encryption";
import { createCommentSchema } from "@/lib/validators/feedback";

export async function createComment(input: {
  workspaceId: string;
  itemId: string;
  body: string;
}) {
  const parsed = createCommentSchema.safeParse(input);
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

  const { data: item } = await supabase
    .from("feedback_items")
    .select("status")
    .eq("id", parsed.data.itemId)
    .single();

  if (!item || item.status === "hidden") {
    return { error: "Cannot comment on a hidden item" };
  }

  const { error } = await supabase.from("comments").insert({
    workspace_id: parsed.data.workspaceId,
    item_id: parsed.data.itemId,
    body: encrypt(parsed.data.body),
    author_id: user.id, // will be overwritten by trigger
  });

  if (error) {
    return { error: error.message };
  }

  return { success: true };
}


