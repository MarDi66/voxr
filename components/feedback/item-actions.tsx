"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { MoreHorizontal, Flag, Pin, PinOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
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
}: {
  itemId: string;
  workspaceId: string;
  isOwn: boolean;
  isAdmin: boolean;
  isFlagged?: boolean;
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
    <>
      <DropdownMenu>
        <DropdownMenuTrigger render={<Button variant="ghost" size="icon" />}>
          <MoreHorizontal className="h-4 w-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-fit">
          {isAdmin && (
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
          )}
          {!isOwn && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setShowReportDialog(true)}>
                <Flag className="mr-2 h-4 w-4" />
                Report
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

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
    </>
  );
}
