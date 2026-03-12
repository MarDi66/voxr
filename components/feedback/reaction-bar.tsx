"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { toggleReaction } from "@/actions/reactions";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const COMMON_EMOJIS = ["👍", "👎", "❤️", "🎉", "🤔", "👀"];

export function ReactionBar({
  workspaceId,
  targetType,
  targetId,
  reactionCounts,
  userReactions,
}: {
  workspaceId: string;
  targetType: "item" | "comment";
  targetId: string;
  reactionCounts: Record<string, number>;
  userReactions: string[];
}) {
  const router = useRouter();

  async function handleToggle(emoji: string) {
    const result = await toggleReaction({
      workspaceId,
      targetType,
      targetId,
      emoji,
    });
    if (result.error) {
      toast.error(result.error);
      return;
    }
    router.refresh();
  }

  return (
    <div className="flex flex-wrap justify-start gap-1">
      {COMMON_EMOJIS.map((emoji) => {
        const count = reactionCounts[emoji] || 0;
        const isActive = userReactions.includes(emoji);
        return (
          <Tooltip key={emoji}>
            <TooltipTrigger
              render={
                <Button
                  variant="outline"
                  size="sm"
                  className={`gap-1 text-sm ${isActive ? "border-primary bg-primary/10" : ""}`}
                  onClick={() => handleToggle(emoji)}
                />
              }
            >
              {emoji}
              {count > 0 && (
                <span className="text-xs text-muted-foreground">{count}</span>
              )}
            </TooltipTrigger>
            <TooltipContent>{emoji}</TooltipContent>
          </Tooltip>
        );
      })}
    </div>
  );
}
