"use server";

import { createClient } from "@/lib/supabase/server";
import { encrypt } from "@/lib/encryption";
import { createItemSchema, updateItemSchema } from "@/lib/validators/feedback";
import crypto from "crypto";

export async function createItem(input: {
  workspaceId: string;
  title: string;
  body: string;
  category: string;
}) {
  const parsed = createItemSchema.safeParse(input);
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

  const itemId = crypto.randomUUID();

  // author_id is set by the trigger — pass a placeholder that will be overwritten
  const { error } = await supabase
    .from("feedback_items")
    .insert({
      id: itemId,
      workspace_id: parsed.data.workspaceId,
      title: encrypt(parsed.data.title),
      body: encrypt(parsed.data.body),
      category: parsed.data.category,
      author_id: user.id, // will be overwritten by trigger
    });

  if (error) {
    return { error: error.message };
  }

  return { success: true, itemId };
}

export async function updateItem(input: {
  itemId: string;
  title?: string;
  body?: string;
  category?: string;
}) {
  const parsed = updateItemSchema.safeParse(input);
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

  const updateData: Record<string, string> = {};
  if (parsed.data.title) updateData.title = encrypt(parsed.data.title);
  if (parsed.data.body) updateData.body = encrypt(parsed.data.body);
  if (parsed.data.category) updateData.category = parsed.data.category;

  const { error } = await supabase
    .from("feedback_items")
    .update(updateData)
    .eq("id", parsed.data.itemId);

  if (error) {
    return { error: error.message };
  }

  return { success: true };
}

export async function setItemStatus(itemId: string, status: "published" | "hidden") {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Not authenticated" };
  }

  const { error } = await supabase.rpc("set_item_status", {
    p_item_id: itemId,
    p_status: status,
  });

  if (error) {
    return { error: error.message };
  }

  return { success: true };
}

export async function setCommentStatus(commentId: string, status: "published" | "hidden") {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Not authenticated" };
  }

  const { error } = await supabase.rpc("set_comment_status", {
    p_comment_id: commentId,
    p_status: status,
  });

  if (error) {
    return { error: error.message };
  }

  return { success: true };
}

export async function toggleFlagItem(workspaceId: string, itemId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Not authenticated" };
  }

  const { error } = await supabase.rpc("toggle_flag_item", {
    p_workspace_id: workspaceId,
    p_item_id: itemId,
  });

  if (error) {
    return { error: error.message };
  }

  return { success: true };
}
