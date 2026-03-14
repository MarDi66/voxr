"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { MoreHorizontal, Flag, Pin, PinOff } from "lucide-react";

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
    toast.success("Report submitted");
    setReportReason("");
    router.refresh();
  }

  async function handleToggleFlag() {
    const result = await toggleFlagItem(workspaceId, itemId);
    if (result.error) {
      toast.error(result.error);
      return;
    }
    toast.success(isFlagged ? "Feedback unpinned" : "Feedback pinned");
    router.refresh();
  }

  return (
    <div className="flex items-center gap-1">
      {!isHidden && (
        <Button
          variant="ghost"
          size="sm"
          className={`h-7 gap-1 px-2 ${reportCount > 0 ? "text-destructive" : "text-muted-foreground hover:text-destructive"}`}
          onClick={() => {
            if (isOwn) {
              toast.error("You cannot report your own feedback");
              return;
            }
            if (hasReported) {
              toast.error("You have already reported this feedback");
              return;
            }
            setShowReportDialog(true);
          }}
          title="Report feedback"
        >
          <Flag className="h-3.5 w-3.5" />
          {reportCount > 0 && <span className="text-xs">{reportCount}</span>}
        </Button>
      )}

      <Dialog open={showReportDialog} onOpenChange={setShowReportDialog}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Report this content</DialogTitle>
                <DialogDescription>
                  Help us understand why this content should be reviewed.
                </DialogDescription>
              </DialogHeader>
              <Textarea
                placeholder="Reason for reporting (optional)"
                value={reportReason}
                onChange={(e) => setReportReason(e.target.value)}
              />
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowReportDialog(false)}>Cancel</Button>
                <Button onClick={() => { handleReport(); setShowReportDialog(false); }}>Submit Report</Button>
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
                  Unpin
                </>
              ) : (
                <>
                  <Pin className="mr-2 h-4 w-4" />
                  Pin to top
                </>
              )}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
}
