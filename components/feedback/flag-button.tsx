"use client";

import { useRouter } from "@/lib/i18n/navigation";
import { toast } from "sonner";
import { Pin, PinOff } from "lucide-react";
import { useTranslations } from "next-intl";

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
  const t = useTranslations("feedback");
  const router = useRouter();

  async function handleToggle(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();

    const result = await toggleFlagItem(workspaceId, itemId);
    if (result.error) {
      toast.error(result.error);
      return;
    }
    toast.success(isFlagged ? t("unpinned") : t("pinned"));
    router.refresh();
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      className="h-7 w-7 p-0"
      onClick={handleToggle}
      title={isFlagged ? t("unpinFeedback") : t("pinFeedback")}
    >
      {isFlagged ? (
        <PinOff className="h-4 w-4 text-amber-600" />
      ) : (
        <Pin className="h-4 w-4 text-muted-foreground hover:text-amber-600" />
      )}
    </Button>
  );
}
