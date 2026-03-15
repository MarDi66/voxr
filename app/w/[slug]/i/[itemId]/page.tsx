import { redirect } from "next/navigation";
import { Pin } from "lucide-react";
import { getItemDetail, getWorkspaceBySlug, checkUserRole } from "@/lib/supabase/queries";
import { generateAnonymousIdentities } from "@/lib/anonymous-identity";

import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

import { ReactionBar } from "@/components/feedback/reaction-bar";
import { CommentSection } from "@/components/feedback/comment-section";
import { ItemActions } from "@/components/feedback/item-actions";

const categoryColors: Record<string, string> = {
  idea: "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
  concern: "bg-orange-50 text-orange-700 dark:bg-orange-950 dark:text-orange-300",
  praise: "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300",
  question: "bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300",
};

const categoryEmojis: Record<string, string> = {
  idea: "💡",
  concern: "⚠️",
  praise: "🎉",
  question: "❓",
};

export default async function ItemDetailPage({
  params,
}: {
  params: Promise<{ slug: string; itemId: string }>;
}) {
  const { slug, itemId } = await params;
  const workspace = await getWorkspaceBySlug(slug);

  if (!workspace) {
    redirect("/onboarding");
  }

  const item = await getItemDetail(itemId);
  if (!item) {
    redirect(`/w/${slug}`);
  }

  const role = await checkUserRole(workspace.id);
  const isAdmin = role === "owner" || role === "admin";
  const isHidden = item.status === "hidden";

  // Generate anonymous identities for the item author and all commenters
  const allHashes = [
    item.author_context_hash,
    ...item.comments.map((c: { author_context_hash: string }) => c.author_context_hash),
  ];
  const identities = generateAnonymousIdentities(allHashes);
  const itemIdentity = identities.get(item.author_context_hash)!;
  const enrichedComments = item.comments.map((c: { author_context_hash: string }) => ({
    ...c,
    anonymousName: identities.get(c.author_context_hash)!.name,
    anonymousAvatarUrl: identities.get(c.author_context_hash)!.avatarUrl,
  }));

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between gap-2">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge
                  variant="secondary"
                  className={categoryColors[item.category] || ""}
                >
                  {categoryEmojis[item.category]} {item.category}
                </Badge>
                {item.is_flagged && (
                  <Badge variant="secondary" className="bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300">
                    <Pin className="mr-1 h-3 w-3" />
                    Pinned
                  </Badge>
                )}
                {item.status === "hidden" && (
                  <Badge variant="destructive">Hidden</Badge>
                )}
              </div>
              <CardTitle className={cn("text-xl", isHidden && "select-none blur-sm")}>
                {isHidden ? "Hidden content" : item.title}
              </CardTitle>
            </div>
            <ItemActions
              itemId={item.id}
              workspaceId={workspace.id}
              isOwn={item.is_own}
              isAdmin={isAdmin}
              isFlagged={item.is_flagged}
              isHidden={isHidden}
              reportCount={item.reportCount}
              hasReported={item.hasReported}
            />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className={cn("whitespace-pre-wrap text-sm leading-relaxed", isHidden && "select-none blur-sm")}>
            {isHidden ? "This content has been hidden by a moderator." : item.body}
          </p>
          <div className="flex items-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={itemIdentity.avatarUrl}
              alt={itemIdentity.name}
              className="h-8 w-8 rounded-full shrink-0"
            />
            <div>
              <span className="text-xs font-medium">{itemIdentity.name}</span>
              <div className="text-xs text-muted-foreground">
                {new Date(item.created_at).toLocaleString()}
              </div>
            </div>
          </div>
          <Separator />
          <ReactionBar
            workspaceId={workspace.id}
            targetType="item"
            targetId={item.id}
            reactionCounts={item.reactionCounts}
            userReactions={item.userReactions}
          />
        </CardContent>
      </Card>

      <CommentSection
        workspaceId={workspace.id}
        itemId={item.id}
        comments={enrichedComments}
        isItemHidden={isHidden}
      />
    </div>
  );
}
