"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Pin, PinOff } from "lucide-react";

import { toggleFlagItem } from "@/actions/feedback";
import { Button } from "@/components/ui/button";

export function FlagButton({
  itemId,
  workspaceId,
  isFlagged,
}: {
  itemId: string;
  workspaceId: string;
  isFlagged: boolean;
}) {
  const router = useRouter();

  async function handleToggle(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();

    const result = await toggleFlagItem(workspaceId, itemId);
    if (result.error) {
      toast.error(result.error);
      return;
    }
    toast.success(isFlagged ? "Feedback unpinned" : "Feedback pinned");
    router.refresh();
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      className="h-7 w-7 p-0"
      onClick={handleToggle}
      title={isFlagged ? "Unpin feedback" : "Pin feedback"}
    >
      {isFlagged ? (
        <PinOff className="h-4 w-4 text-amber-600" />
      ) : (
        <Pin className="h-4 w-4 text-muted-foreground hover:text-amber-600" />
      )}
    </Button>
  );
}
