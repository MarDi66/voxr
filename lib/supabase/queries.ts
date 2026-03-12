import { createClient } from "@/lib/supabase/server";

export async function getWorkspaceBySlug(slug: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("workspaces")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) return null;
  return data;
}

export async function getFeed(
  workspaceId: string,
  options?: {
    category?: string;
    search?: string;
    sort?: "newest" | "top";
  }
) {
  const supabase = await createClient();

  // 1. Always fetch the flagged item (shown on top regardless of filters)
  const { data: flaggedItems } = await supabase
    .from("feedback_items_safe")
    .select("*")
    .eq("workspace_id", workspaceId)
    .eq("status", "published")
    .eq("is_flagged", true)
    .limit(1);

  // 2. Fetch regular (non-flagged) items with filters applied
  let query = supabase
    .from("feedback_items_safe")
    .select("*")
    .eq("workspace_id", workspaceId)
    .eq("status", "published")
    .eq("is_flagged", false);

  if (options?.category && options.category !== "all") {
    query = query.eq("category", options.category);
  }

  if (options?.search) {
    query = query.or(
      `title.ilike.%${options.search}%,body.ilike.%${options.search}%`
    );
  }

  query = query.order("created_at", { ascending: false });

  const { data: regularItems, error } = await query;

  if (error) return [];

  // Combine: flagged first, then regular items
  const items = [...(flaggedItems || []), ...(regularItems || [])];

  if (items.length === 0) return [];

  // Get comment counts and reaction counts for each item
  const itemIds = items.map((i) => i.id);

  const { data: commentCounts } = await supabase
    .from("comments")
    .select("item_id")
    .eq("workspace_id", workspaceId)
    .eq("status", "published")
    .in("item_id", itemIds);

  const { data: reactions } = await supabase
    .from("reactions")
    .select("target_id, emoji")
    .eq("target_type", "item")
    .in("target_id", itemIds);

  // Build counts
  const commentCountMap: Record<string, number> = {};
  commentCounts?.forEach((c) => {
    commentCountMap[c.item_id] = (commentCountMap[c.item_id] || 0) + 1;
  });

  const reactionCountMap: Record<string, Record<string, number>> = {};
  reactions?.forEach((r) => {
    if (!reactionCountMap[r.target_id]) {
      reactionCountMap[r.target_id] = {};
    }
    reactionCountMap[r.target_id][r.emoji] =
      (reactionCountMap[r.target_id][r.emoji] || 0) + 1;
  });

  const enriched = items.map((item) => ({
    ...item,
    commentCount: commentCountMap[item.id] || 0,
    reactionCounts: reactionCountMap[item.id] || {},
  }));

  if (options?.sort === "top") {
    // Keep flagged item(s) on top, sort the rest by engagement
    const flagged = enriched.filter((i) => i.is_flagged);
    const rest = enriched.filter((i) => !i.is_flagged);
    rest.sort((a, b) => {
      const totalA =
        a.commentCount +
        Object.values(a.reactionCounts).reduce((s, n) => s + n, 0);
      const totalB =
        b.commentCount +
        Object.values(b.reactionCounts).reduce((s, n) => s + n, 0);
      return totalB - totalA;
    });
    return [...flagged, ...rest];
  }

  return enriched;
}

export async function getItemDetail(itemId: string) {
  const supabase = await createClient();

  // Get item via safe view
  const { data: item, error } = await supabase
    .from("feedback_items_safe")
    .select("*")
    .eq("id", itemId)
    .single();

  if (error || !item) return null;

  // Get comments via safe view
  const { data: comments } = await supabase
    .from("comments_safe")
    .select("*")
    .eq("item_id", itemId)
    .eq("status", "published")
    .order("created_at", { ascending: true });

  // Get reactions for the item
  const { data: reactions } = await supabase
    .from("reactions")
    .select("*")
    .eq("target_type", "item")
    .eq("target_id", itemId);

  // Get current user's reactions
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const userReactions =
    reactions?.filter((r) => r.user_id === user?.id).map((r) => r.emoji) || [];

  // Group reactions by emoji
  const reactionCounts: Record<string, number> = {};
  reactions?.forEach((r) => {
    reactionCounts[r.emoji] = (reactionCounts[r.emoji] || 0) + 1;
  });

  // Get reactions for comments
  const commentIds = comments?.map((c) => c.id) || [];
  const { data: commentReactions } = await supabase
    .from("reactions")
    .select("*")
    .eq("target_type", "comment")
    .in("target_id", commentIds.length > 0 ? commentIds : ["__none__"]);

  const commentReactionMap: Record<
    string,
    { counts: Record<string, number>; userEmojis: string[] }
  > = {};
  commentReactions?.forEach((r) => {
    if (!commentReactionMap[r.target_id]) {
      commentReactionMap[r.target_id] = { counts: {}, userEmojis: [] };
    }
    commentReactionMap[r.target_id].counts[r.emoji] =
      (commentReactionMap[r.target_id].counts[r.emoji] || 0) + 1;
    if (r.user_id === user?.id) {
      commentReactionMap[r.target_id].userEmojis.push(r.emoji);
    }
  });

  return {
    ...item,
    comments:
      comments?.map((c) => ({
        ...c,
        reactionCounts: commentReactionMap[c.id]?.counts || {},
        userReactions: commentReactionMap[c.id]?.userEmojis || [],
      })) || [],
    reactionCounts,
    userReactions,
  };
}

export async function checkUserRole(workspaceId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data } = await supabase
    .from("workspace_members")
    .select("role")
    .eq("workspace_id", workspaceId)
    .eq("user_id", user.id)
    .eq("status", "active")
    .single();

  return data?.role || null;
}
