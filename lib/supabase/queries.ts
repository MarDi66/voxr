import { createClient } from "@/lib/supabase/server";
import { decrypt, decryptFields } from "@/lib/encryption";

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
    .eq("is_flagged", true)
    .limit(1);

  // 2. Fetch regular (non-flagged) items with filters applied
  let query = supabase
    .from("feedback_items_safe")
    .select("*")
    .eq("workspace_id", workspaceId)
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

  // Get report counts for each item
  const { data: reportsSummary } = await supabase.rpc("get_reports_summary", {
    target_ids: itemIds,
  });

  const reportCountMap: Record<string, number> = {};
  reportsSummary?.forEach((r: { target_id: string; report_count: number }) => {
    reportCountMap[r.target_id] = r.report_count;
  });

  const enriched = items.map((item) => ({
    ...decryptFields(item, ["title", "body"]),
    commentCount: commentCountMap[item.id] || 0,
    reactionCounts: reactionCountMap[item.id] || {},
    reportCount: reportCountMap[item.id] || 0,
  }));

  if (options?.sort === "top") {
    // Keep flagged item(s) on top, sort the rest by engagement
    const flagged = enriched.filter((i) => i.is_flagged);
    const rest = enriched.filter((i) => !i.is_flagged);
    rest.sort((a, b) => {
      const totalA =
        a.commentCount +
        (Object.values(a.reactionCounts) as number[]).reduce((s, n) => s + n, 0);
      const totalB =
        b.commentCount +
        (Object.values(b.reactionCounts) as number[]).reduce((s, n) => s + n, 0);
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

  // Get comments via safe view (including hidden — UI shows blur placeholder)
  const { data: comments } = await supabase
    .from("comments_safe")
    .select("*")
    .eq("item_id", itemId)
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

  // Get report info for the item and its comments
  const allTargetIds = [itemId, ...commentIds];
  const { data: reportsSummary } = await supabase.rpc("get_reports_summary", {
    target_ids: allTargetIds,
  });

  const reportsMap: Record<string, { reportCount: number; hasReported: boolean }> = {};
  reportsSummary?.forEach((r: { target_id: string; report_count: number; has_reported: boolean }) => {
    reportsMap[r.target_id] = {
      reportCount: r.report_count,
      hasReported: r.has_reported,
    };
  });

  return {
    ...decryptFields(item, ["title", "body"]),
    reportCount: reportsMap[itemId]?.reportCount || 0,
    hasReported: reportsMap[itemId]?.hasReported || false,
    comments:
      comments?.map((c) => ({
        ...decryptFields(c, ["body"]),
        reactionCounts: commentReactionMap[c.id]?.counts || {},
        userReactions: commentReactionMap[c.id]?.userEmojis || [],
        reportCount: reportsMap[c.id]?.reportCount || 0,
        hasReported: reportsMap[c.id]?.hasReported || false,
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

export async function getWorkspaceAnalytics(workspaceId: string) {
  const supabase = await createClient();

  const [
    { data: feedbackItems },
    { data: comments },
    { data: reactions },
    { data: members },
  ] = await Promise.all([
    supabase
      .from("feedback_items_safe")
      .select("id, category, status, is_flagged, created_at")
      .eq("workspace_id", workspaceId),
    supabase
      .from("comments")
      .select("id, item_id, status, created_at")
      .eq("workspace_id", workspaceId),
    supabase
      .from("reactions")
      .select("id, emoji, target_type, target_id, created_at")
      .eq("workspace_id", workspaceId),
    supabase
      .from("workspace_members")
      .select("user_id, role, status, joined_at")
      .eq("workspace_id", workspaceId)
      .eq("status", "active"),
  ]);

  // --- Emoji sentiment classification ---
  const POSITIVE_EMOJIS = new Set([
    "👍", "❤️", "🎉", "🙌", "💪", "🔥", "✨", "💯", "🥳", "😊",
    "😍", "🤩", "👏", "💖", "💚", "💙", "💜", "🧡", "🤗", "😄",
    "😁", "🥰", "🌟", "⭐", "🏆", "🎯", "✅", "👌", "🤝", "💐",
  ]);
  const NEGATIVE_EMOJIS = new Set([
    "👎", "😢", "😡", "💔", "😤", "😞", "😟", "😠", "🤮", "😰",
    "😥", "😩", "😫", "🙁", "☹️", "😒", "😑", "❌", "⚠️", "🚩",
  ]);

  function classifyEmoji(emoji: string): "positive" | "negative" | "neutral" {
    if (POSITIVE_EMOJIS.has(emoji)) return "positive";
    if (NEGATIVE_EMOJIS.has(emoji)) return "negative";
    return "neutral";
  }

  // --- Category distribution ---
  const categoryDistribution = ["idea", "concern", "praise", "question"].map(
    (cat) => ({
      category: cat,
      count: feedbackItems?.filter((i) => i.category === cat).length ?? 0,
    })
  );

  // --- Reaction mood breakdown ---
  let positiveReactions = 0;
  let negativeReactions = 0;
  let neutralReactions = 0;
  reactions?.forEach((r) => {
    const sentiment = classifyEmoji(r.emoji);
    if (sentiment === "positive") positiveReactions++;
    else if (sentiment === "negative") negativeReactions++;
    else neutralReactions++;
  });
  const reactionMood = { positive: positiveReactions, negative: negativeReactions, neutral: neutralReactions };

  // --- Wellbeing score (composite) ---
  const concerns = feedbackItems?.filter((i) => i.category === "concern").length ?? 0;
  const praises = feedbackItems?.filter((i) => i.category === "praise").length ?? 0;
  const totalFeedback = feedbackItems?.length ?? 0;
  const totalReactions = reactions?.length ?? 0;

  // Component 1: Feedback sentiment (praise vs concern ratio) — 40% weight
  const feedbackSentiment = totalFeedback > 0
    ? Math.max(0, Math.min(100, Math.round(((praises - concerns) / totalFeedback + 1) * 50)))
    : 50;

  // Component 2: Reaction sentiment (positive vs negative) — 40% weight
  const ratedReactions = positiveReactions + negativeReactions;
  const reactionSentiment = ratedReactions > 0
    ? Math.round((positiveReactions / ratedReactions) * 100)
    : 50;

  // Component 3: Response rate (items with comments — people feel heard) — 20% weight
  const itemsWithComments = new Set(comments?.map((c) => c.item_id) ?? []).size;
  const responseRate = totalFeedback > 0
    ? Math.round((itemsWithComments / totalFeedback) * 100)
    : 0;

  const wellbeingScore = Math.round(
    feedbackSentiment * 0.4 +
    reactionSentiment * 0.4 +
    responseRate * 0.2
  );

  // --- Wellbeing trend (last 12 weeks) ---
  const now = new Date();
  const weeklyWellbeing = Array.from({ length: 12 }, (_, i) => {
    const weekStart = new Date(now);
    weekStart.setDate(weekStart.getDate() - (11 - i) * 7);
    weekStart.setHours(0, 0, 0, 0);
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 7);

    const inRange = <T extends { created_at: string }>(arr: T[] | null) =>
      arr?.filter((x) => {
        const d = new Date(x.created_at);
        return d >= weekStart && d < weekEnd;
      }) ?? [];

    const weekFeedback = inRange(feedbackItems);
    const weekComments = inRange(comments);
    const weekReactions = inRange(reactions);

    const weekPraises = weekFeedback.filter((i) => i.category === "praise").length;
    const weekConcerns = weekFeedback.filter((i) => i.category === "concern").length;
    const weekTotal = weekFeedback.length;
    const weekFeedbackSentiment = weekTotal > 0
      ? Math.max(0, Math.min(100, Math.round(((weekPraises - weekConcerns) / weekTotal + 1) * 50)))
      : 50;

    let weekPositive = 0;
    let weekNegative = 0;
    weekReactions.forEach((r) => {
      const s = classifyEmoji(r.emoji);
      if (s === "positive") weekPositive++;
      else if (s === "negative") weekNegative++;
    });
    const weekRated = weekPositive + weekNegative;
    const weekReactionSentiment = weekRated > 0
      ? Math.round((weekPositive / weekRated) * 100)
      : 50;

    const weekItemsWithComments = new Set(weekComments.map((c) => c.item_id)).size;
    const weekResponseRate = weekTotal > 0
      ? Math.round((weekItemsWithComments / weekTotal) * 100)
      : 0;

    const weekScore = Math.round(
      weekFeedbackSentiment * 0.4 +
      weekReactionSentiment * 0.4 +
      weekResponseRate * 0.2
    );

    return {
      week: weekStart.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      score: weekScore,
      feedback: weekFeedback.length,
      comments: weekComments.length,
      reactions: weekReactions.length,
    };
  });

  // --- Psychological safety index ---
  // Measures whether team uses all categories (especially concerns), indicating trust
  const categoriesUsed = new Set(feedbackItems?.map((i) => i.category) ?? []);
  const categoryDiversity = categoriesUsed.size / 4; // 0 to 1
  const concernRatio = totalFeedback > 0 ? concerns / totalFeedback : 0;
  // A healthy concern ratio is around 15-35% — too low means people don't feel safe raising issues
  const concernBalance = concernRatio >= 0.15 && concernRatio <= 0.35 ? 1
    : concernRatio > 0 ? 0.6
    : 0.3;
  const psychologicalSafety = Math.round(categoryDiversity * 50 + concernBalance * 50);

  // --- Engagement summary ---
  const totalComments = comments?.length ?? 0;
  const avgCommentsPerItem = totalFeedback > 0
    ? Math.round((totalComments / totalFeedback) * 10) / 10
    : 0;
  const avgReactionsPerItem = totalFeedback > 0
    ? Math.round((totalReactions / totalFeedback) * 10) / 10
    : 0;

  // --- Member count ---
  const activeMembers = members?.length ?? 0;

  // --- Top emoji reactions ---
  const emojiCounts: Record<string, number> = {};
  reactions?.forEach((r) => {
    emojiCounts[r.emoji] = (emojiCounts[r.emoji] || 0) + 1;
  });
  const topEmojis = Object.entries(emojiCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([emoji, count]) => ({ emoji, count }));

  return {
    categoryDistribution,
    weeklyWellbeing,
    wellbeingScore,
    reactionMood,
    responseRate,
    psychologicalSafety,
    sentiment: { concerns, praises, ideas: categoryDistribution[0].count, questions: categoryDistribution[3].count },
    engagement: {
      totalFeedback,
      totalComments,
      totalReactions,
      avgCommentsPerItem,
      avgReactionsPerItem,
    },
    team: {
      activeMembers,
    },
    topEmojis,
  };
}

export async function getWorkspaceForms(workspaceId: string) {
  const supabase = await createClient();

  const { data: forms, error } = await supabase
    .from("forms")
    .select("*")
    .eq("workspace_id", workspaceId)
    .order("created_at", { ascending: false });

  if (error || !forms) return [];

  const formIds = forms.map((f) => f.id);

  // Get response counts per form
  const { data: responses } = await supabase
    .from("form_responses")
    .select("id, form_id")
    .in("form_id", formIds.length > 0 ? formIds : ["__none__"]);

  const responseCountMap: Record<string, number> = {};
  responses?.forEach((r) => {
    responseCountMap[r.form_id] = (responseCountMap[r.form_id] || 0) + 1;
  });

  // Check which forms the current user has already responded to
  const { data: ownResponses } = await supabase
    .from("form_responses_safe")
    .select("form_id, is_own")
    .in("form_id", formIds.length > 0 ? formIds : ["__none__"])
    .eq("is_own", true);

  const respondedSet = new Set(ownResponses?.map((r) => r.form_id) || []);

  const enriched = forms.map((form) => ({
    ...decryptFields(form, ["title", "description"]),
    responseCount: responseCountMap[form.id] || 0,
    hasResponded: respondedSet.has(form.id),
  }));

  // Closed forms sink to the bottom; within each group order is preserved (newest first)
  enriched.sort((a, b) => {
    if (a.status === b.status) return 0;
    return a.status === "closed" ? 1 : -1;
  });

  return enriched;
}

export async function getFormDetail(formId: string) {
  const supabase = await createClient();

  const { data: form, error } = await supabase
    .from("forms")
    .select("*")
    .eq("id", formId)
    .single();

  if (error || !form) return null;

  const { data: questions } = await supabase
    .from("form_questions")
    .select("*")
    .eq("form_id", formId)
    .order("position", { ascending: true });

  // Check if current user has already responded
  const { data: ownResponses } = await supabase
    .from("form_responses_safe")
    .select("id, is_own")
    .eq("form_id", formId)
    .eq("is_own", true);

  const hasResponded = (ownResponses?.length ?? 0) > 0;

  return {
    ...decryptFields(form, ["title", "description"]),
    questions: (questions || []).map((q) => ({
      ...decryptFields(q, ["question_text"]),
      options: (q.options as string[] || []).map((o: string) => decrypt(o)),
    })),
    hasResponded,
  };
}

export async function getFormResults(formId: string) {
  const supabase = await createClient();

  const { data: form, error } = await supabase
    .from("forms")
    .select("*")
    .eq("id", formId)
    .single();

  if (error || !form) return null;

  const [{ data: questions }, { data: responses }, { data: members }] =
    await Promise.all([
      supabase
        .from("form_questions")
        .select("*")
        .eq("form_id", formId)
        .order("position", { ascending: true }),
      supabase
        .from("form_responses")
        .select("id, form_id")
        .eq("form_id", formId),
      supabase
        .from("workspace_members")
        .select("user_id")
        .eq("workspace_id", form.workspace_id)
        .eq("status", "active"),
    ]);

  const responseIds = responses?.map((r) => r.id) || [];

  // Get all answers
  const { data: answers } = await supabase
    .from("form_answers")
    .select("*")
    .in("response_id", responseIds.length > 0 ? responseIds : ["__none__"]);

  // Group answers by question, decrypting each value
  const answersByQuestion: Record<string, string[]> = {};
  answers?.forEach((a) => {
    if (!answersByQuestion[a.question_id]) {
      answersByQuestion[a.question_id] = [];
    }
    const decrypted = decryptFields(a, ["answer_value"]);
    answersByQuestion[a.question_id].push(decrypted.answer_value);
  });

  return {
    ...decryptFields(form, ["title", "description"]),
    questions: (questions || []).map((q) => ({
      ...decryptFields(q, ["question_text"]),
      options: (q.options as string[] || []).map((o: string) => decrypt(o)),
    })),
    responseCount: responses?.length || 0,
    memberCount: members?.length || 0,
    answersByQuestion,
  };
}
