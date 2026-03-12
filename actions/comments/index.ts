"use server";

import { createClient } from "@/lib/supabase/server";
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

  const { error } = await supabase.from("comments").insert({
    workspace_id: parsed.data.workspaceId,
    item_id: parsed.data.itemId,
    body: parsed.data.body,
    author_id: user.id, // will be overwritten by trigger
  });

  if (error) {
    return { error: error.message };
  }

  return { success: true };
}

export async function deleteComment(commentId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Not authenticated" };
  }

  const { error } = await supabase
    .from("comments")
    .delete()
    .eq("id", commentId);

  if (error) {
    return { error: error.message };
  }

  return { success: true };
}

export async function setCommentStatus(
  commentId: string,
  status: "published" | "hidden"
) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Not authenticated" };
  }

  const { error } = await supabase
    .from("comments")
    .update({ status })
    .eq("id", commentId);

  if (error) {
    return { error: error.message };
  }

  return { success: true };
}
