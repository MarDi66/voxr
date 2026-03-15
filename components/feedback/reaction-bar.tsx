"use client";

import { SmilePlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useOptimistic, useTransition } from "react";
import { toast } from "sonner";
import { toggleReaction } from "@/actions/reactions";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const AVAILABLE_EMOJIS = ["👍", "👎", "❤️", "🎉", "🤔", "👀"];

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
  const [, startTransition] = useTransition();

  const [optimistic, applyOptimistic] = useOptimistic(
    { counts: reactionCounts, userReactions },
    (state, emoji: string) => {
      const wasActive = state.userReactions.includes(emoji);
      const newUserReactions = wasActive
        ? state.userReactions.filter((e) => e !== emoji)
        : [...state.userReactions, emoji];
      const newCounts = {
        ...state.counts,
        [emoji]: (state.counts[emoji] ?? 0) + (wasActive ? -1 : 1),
      };
      return { counts: newCounts, userReactions: newUserReactions };
    }
  );

  async function handleToggle(emoji: string) {
    startTransition(async () => {
      applyOptimistic(emoji);
      const result = await toggleReaction({
        workspaceId,
        targetType,
        targetId,
        emoji,
      });
      if (result.error) {
        toast.error(result.error);
      }
      router.refresh();
    });
  }

  const activeReactions = Object.entries(optimistic.counts).filter(
    ([, count]) => count > 0
  );

  return (
    <div className="flex flex-wrap items-center gap-1">
      {activeReactions.map(([emoji, count]) => {
        const isActive = optimistic.userReactions.includes(emoji);
        return (
          <Button
            key={emoji}
            variant="outline"
            size="xs"
            className={`gap-1 ${isActive ? "border-primary bg-primary/10" : ""}`}
            onClick={() => handleToggle(emoji)}
          >
            <span>{emoji}</span>
            <span className="text-xs text-muted-foreground">{count}</span>
          </Button>
        );
      })}

      <Popover>
        <PopoverTrigger
          render={
            <Button variant="outline" size="icon-xs">
              <SmilePlusIcon className="size-3.5" />
            </Button>
          }
        />
        <PopoverContent align="start" className="w-auto p-1">
          <div className="flex gap-1">
            {AVAILABLE_EMOJIS.map((emoji) => (
              <Button
                key={emoji}
                variant="ghost"
                size="icon-sm"
                className={optimistic.userReactions.includes(emoji) ? "bg-primary/10" : ""}
                onClick={() => handleToggle(emoji)}
              >
                {emoji}
              </Button>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
