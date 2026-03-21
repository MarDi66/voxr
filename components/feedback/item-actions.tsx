"use client";

import { useRouter } from "@/lib/i18n/navigation";
import { toast } from "sonner";
import { MoreHorizontal, Flag, Pin, PinOff } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

import { toggleFlagItem } from "@/actions/feedback";
import { reportTarget } from "@/actions/moderation";
import { useState } from "react";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export function ItemActions({
  itemId,
  workspaceId,
  isOwn,
  isAdmin,
  isFlagged = false,
  isHidden = false,
  reportCount = 0,
  hasReported = false,
}: {
  itemId: string;
  workspaceId: string;
  isOwn: boolean;
  isAdmin: boolean;
  isFlagged?: boolean;
  isHidden?: boolean;
  reportCount?: number;
  hasReported?: boolean;
}) {
  const t = useTranslations("feedback");
  const tc = useTranslations("common");
  const router = useRouter();
  const [reportReason, setReportReason] = useState("");
  const [showReportDialog, setShowReportDialog] = useState(false);

  async function handleReport() {
    const result = await reportTarget({
      workspaceId,
      targetType: "item",
      targetId: itemId,
      reason: reportReason,
    });
    if (result.error) {
      toast.error(result.error);
      return;
    }
    toast.success(t("reportSubmitted"));
    setReportReason("");
    router.refresh();
  }

  async function handleToggleFlag() {
    const result = await toggleFlagItem(workspaceId, itemId);
    if (result.error) {
      toast.error(result.error);
      return;
    }
    toast.success(isFlagged ? t("unpinned") : t("pinned"));
    router.refresh();
  }

  return (
    <div className="flex items-center gap-1">
      {!isHidden && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger
              render={
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    'h-7 gap-1 px-2',
                    reportCount > 0 ? "text-destructive" : "text-muted-foreground hover:text-destructive",
                    reportCount === 0 && 'sm:hidden sm:group-hover:inline-flex'
                  )}
                  onClick={() => {
                    if (isOwn) {
                      toast.error(t("cannotReportOwnFeedback"));
                      return;
                    }
                    if (hasReported) {
                      toast.error(t("alreadyReportedFeedback"));
                      return;
                    }
                    setShowReportDialog(true);
                  }}
                />
              }
            >
              <Flag className="h-3.5 w-3.5" />
              {reportCount > 0 && <span className="text-xs">{reportCount}</span>}
            </TooltipTrigger>
            <TooltipContent>{t("reportFeedback")}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}

      <Dialog open={showReportDialog} onOpenChange={setShowReportDialog}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{t("reportThisContent")}</DialogTitle>
                <DialogDescription>
                  {t("reportDescription")}
                </DialogDescription>
              </DialogHeader>
              <Textarea
                placeholder={t("reportReasonLabel")}
                value={reportReason}
                onChange={(e) => setReportReason(e.target.value)}
              />
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowReportDialog(false)}>{tc("cancel")}</Button>
                <Button onClick={() => { handleReport(); setShowReportDialog(false); }}>{t("submitReport")}</Button>
              </DialogFooter>
            </DialogContent>
      </Dialog>

      {isAdmin && (
        <DropdownMenu>
          <DropdownMenuTrigger render={<Button variant="ghost" size="icon" />}>
            <MoreHorizontal className="h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-fit">
            <DropdownMenuItem onClick={handleToggleFlag}>
              {isFlagged ? (
                <>
                  <PinOff className="mr-2 h-4 w-4" />
                  {t("unpin")}
                </>
              ) : (
                <>
                  <Pin className="mr-2 h-4 w-4" />
                  {t("pinToTop")}
                </>
              )}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
}
