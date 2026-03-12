"use client";

import { SmilePlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
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

  const activeReactions = Object.entries(reactionCounts).filter(
    ([, count]) => count > 0
  );

  return (
    <div className="flex flex-wrap items-center gap-1">
      {activeReactions.map(([emoji, count]) => {
        const isActive = userReactions.includes(emoji);
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
                className={userReactions.includes(emoji) ? "bg-primary/10" : ""}
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
