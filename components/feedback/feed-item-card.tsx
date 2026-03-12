import Link from "next/link";
import { MessageSquare, Pin } from "lucide-react";

import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FlagButton } from "@/components/feedback/flag-button";

type FeedItem = {
  id: string;
  workspace_id: string;
  title: string;
  body: string;
  category: string;
  status: string;
  created_at: string;
  is_own: boolean;
  is_flagged: boolean;
  commentCount: number;
  reactionCounts: Record<string, number>;
};

const categoryColors: Record<string, string> = {
  idea: "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
  concern: "bg-orange-50 text-orange-700 dark:bg-orange-950 dark:text-orange-300",
  praise: "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300",
  question: "bg-yellow-50 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300",
};

const categoryEmojis: Record<string, string> = {
  idea: "💡",
  concern: "⚠️",
  praise: "🎉",
  question: "❓",
};

export function FeedItemCard({
  item,
  slug,
  isOwner = false,
}: {
  item: FeedItem;
  slug: string;
  isOwner?: boolean;
}) {
  const totalReactions = Object.values(item.reactionCounts).reduce(
    (sum, count) => sum + count,
    0
  );

  const isHidden = item.status === "hidden";

  return (
    <Link href={`/w/${slug}/i/${item.id}`} className="block">
      <Card
        className={cn(
          "transition-colors hover:bg-accent/50",
          item.is_flagged &&
            "ring-2 ring-amber-400 bg-amber-50/50 dark:bg-amber-950/20"
        )}
      >
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2">
              {item.is_flagged && (
                <Pin className="h-4 w-4 shrink-0 text-amber-600" />
              )}
              <CardTitle className={cn("text-base leading-snug", isHidden && "select-none blur-sm")}>
                {isHidden ? "Hidden content" : item.title}
              </CardTitle>
            </div>
            <div className="flex items-center gap-1">
              {isOwner && !isHidden && (
                <FlagButton
                  itemId={item.id}
                  workspaceId={item.workspace_id}
                  isFlagged={item.is_flagged}
                />
              )}
              <Badge
                variant="secondary"
                className={categoryColors[item.category] || ""}
              >
                {categoryEmojis[item.category]} {item.category}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className={cn("mb-3 line-clamp-2 text-sm text-muted-foreground", isHidden && "select-none blur-sm")}>
            {isHidden ? "This content has been hidden by a moderator." : item.body}
          </p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span>
              {new Date(item.created_at).toLocaleDateString()}
            </span>
            <span className="flex items-center gap-1">
              <MessageSquare className="h-3 w-3" />
              {item.commentCount}
            </span>
            {totalReactions > 0 && (
              <span className="flex items-center gap-2">
                {Object.entries(item.reactionCounts)
                  .slice(0, 3)
                  .map(([emoji, count]) => (
                    <span key={emoji}>
                      {emoji} {count}
                    </span>
                  ))}
              </span>
            )}
            {item.is_own && (
              <Badge variant="outline" className="text-xs">
                yours
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
