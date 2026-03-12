import { redirect } from "next/navigation";
import { getItemDetail, getWorkspaceBySlug, checkUserRole } from "@/lib/supabase/queries";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

import { ReactionBar } from "@/components/feedback/reaction-bar";
import { CommentSection } from "@/components/feedback/comment-section";
import { ItemActions } from "@/components/feedback/item-actions";

const categoryColors: Record<string, string> = {
  idea: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  concern: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
  praise: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  question: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
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
  const isAdmin = role === "admin";

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
                  {item.category}
                </Badge>
                {item.status === "hidden" && (
                  <Badge variant="destructive">Hidden</Badge>
                )}
                {item.is_own && (
                  <Badge variant="outline">yours</Badge>
                )}
              </div>
              <CardTitle className="text-xl">{item.title}</CardTitle>
            </div>
            <ItemActions
              itemId={item.id}
              workspaceId={workspace.id}
              slug={slug}
              isOwn={item.is_own}
              isAdmin={isAdmin}
              currentStatus={item.status}
            />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="whitespace-pre-wrap text-sm leading-relaxed">
            {item.body}
          </p>
          <div className="text-xs text-muted-foreground">
            {new Date(item.created_at).toLocaleString()}
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
        comments={item.comments}
        isAdmin={isAdmin}
      />
    </div>
  );
}
