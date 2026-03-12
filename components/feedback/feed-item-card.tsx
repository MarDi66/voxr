import Link from "next/link";
import { MessageSquare } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type FeedItem = {
  id: string;
  workspace_id: string;
  title: string;
  body: string;
  category: string;
  status: string;
  created_at: string;
  is_own: boolean;
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
}: {
  item: FeedItem;
  slug: string;
}) {
  const totalReactions = Object.values(item.reactionCounts).reduce(
    (sum, count) => sum + count,
    0
  );

  return (
    <Link href={`/w/${slug}/i/${item.id}`} className="block">
      <Card className="transition-colors hover:bg-accent/50">
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-base leading-snug">
              {item.title}
            </CardTitle>
            <Badge
              variant="secondary"
              className={categoryColors[item.category] || ""}
            >
              {categoryEmojis[item.category]} {item.category}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="mb-3 line-clamp-2 text-sm text-muted-foreground">
            {item.body}
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
              <span className="flex items-center gap-1">
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
