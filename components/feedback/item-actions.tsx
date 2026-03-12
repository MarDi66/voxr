"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { MoreHorizontal, Trash2, EyeOff, Eye, Flag } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

import { deleteItem, setItemStatus } from "@/actions/feedback";
import { reportTarget } from "@/actions/moderation";
import { useState } from "react";

export function ItemActions({
  itemId,
  workspaceId,
  slug,
  isOwn,
  isAdmin,
  currentStatus,
}: {
  itemId: string;
  workspaceId: string;
  slug: string;
  isOwn: boolean;
  isAdmin: boolean;
  currentStatus: string;
}) {
  const router = useRouter();
  const [reportReason, setReportReason] = useState("");
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [showReportDialog, setShowReportDialog] = useState(false);

  async function handleDelete() {
    const result = await deleteItem(itemId);
    if (result.error) {
      toast.error(result.error);
      return;
    }
    toast.success("Feedback deleted");
    router.push(`/w/${slug}`);
  }

  async function handleToggleVisibility() {
    const newStatus = currentStatus === "published" ? "hidden" : "published";
    const result = await setItemStatus(itemId, newStatus);
    if (result.error) {
      toast.error(result.error);
      return;
    }
    toast.success(newStatus === "hidden" ? "Item hidden" : "Item restored");
    router.refresh();
  }

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

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger render={<Button variant="ghost" size="sm" />}>
          <MoreHorizontal className="h-4 w-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {isOwn && (
            <DropdownMenuItem className="text-destructive" onClick={() => setShowDeleteAlert(true)}>
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          )}
          {isAdmin && (
            <DropdownMenuItem onClick={handleToggleVisibility}>
              {currentStatus === "published" ? (
                <>
                  <EyeOff className="mr-2 h-4 w-4" />
                  Hide
                </>
              ) : (
                <>
                  <Eye className="mr-2 h-4 w-4" />
                  Unhide
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

      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this feedback?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this feedback and all its comments.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

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
