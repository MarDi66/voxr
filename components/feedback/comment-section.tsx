"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "@/lib/i18n/navigation";
import { toast } from "sonner";
import { Loader2, Flag, Info } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { createCommentSchema, type CreateCommentInput } from "@/lib/validators/feedback";
import { createComment } from "@/actions/comments";
import { reportTarget } from "@/actions/moderation";
import { ReactionBar } from "./reaction-bar";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

type Comment = {
  id: string;
  workspace_id: string;
  item_id: string;
  body: string;
  status: string;
  created_at: string;
  is_own: boolean;
  is_item_author: boolean;
  reactionCounts: Record<string, number>;
  userReactions: string[];
  reportCount: number;
  hasReported: boolean;
  anonymousName: string;
  anonymousAvatarUrl: string;
};

function CommentItem({
  comment,
}: {
  comment: Comment;
}) {
  const t = useTranslations("feedback");
  const tc = useTranslations("common");
  const router = useRouter();
  const [showReportDialog, setShowReportDialog] = useState(false);
  const [reportReason, setReportReason] = useState("");
  const [isReporting, setIsReporting] = useState(false);

  async function handleReport() {
    setIsReporting(true);
    const result = await reportTarget({
      workspaceId: comment.workspace_id,
      targetType: "comment",
      targetId: comment.id,
      reason: reportReason,
    });
    setIsReporting(false);
    if (result.error) {
      toast.error(result.error);
      return;
    }
    toast.success(t("reportSubmitted"));
    setReportReason("");
    setShowReportDialog(false);
    router.refresh();
  }

  const isHidden = comment.status === "hidden";

  return (
    <div className="group space-y-2 py-3">
      <div className="flex items-start justify-between gap-2 mb-1">
        <div className="flex items-center gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={comment.anonymousAvatarUrl}
            alt={comment.anonymousName}
            className="h-8 w-8 rounded-full shrink-0"
          />
          <div>
            <div className="flex items-center gap-1">
              <span className="text-xs font-medium block">{comment.anonymousName}</span>
              {comment.is_item_author && (
                <Badge variant="secondary" className="text-[10px] px-1.5 py-0 font-normal">
                  {t("author")}
                </Badge>
              )}
            </div>
            <span className="text-xs text-muted-foreground">
              {new Date(comment.created_at).toLocaleString()}
            </span>
          </div>
        </div>
        <div className="flex items-center shrink-0">
            {isHidden && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>{t("hiddenByAdmin")}</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
            {!isHidden && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger
                    render={
                      <Button
                        variant="ghost"
                        size="sm"
                        className={cn(
                          'h-7 gap-1 px-2 shrink-0',
                          comment.reportCount > 0 ? "text-destructive" : "text-muted-foreground hover:text-destructive",
                          comment.reportCount === 0 && 'sm:hidden sm:group-hover:inline-flex'
                        )}
                        onClick={() => {
                          if (comment.is_own) {
                            toast.error(t("cannotReportOwnComment"));
                            return;
                          }
                          if (comment.hasReported) {
                            toast.error(t("alreadyReportedComment"));
                            return;
                          }
                          setShowReportDialog(true);
                        }}
                      />
                    }
                  >
                    <Flag className="h-3.5 w-3.5" />
                    {comment.reportCount > 0 && <span className="text-xs">{comment.reportCount}</span>}
                  </TooltipTrigger>
                  <TooltipContent>{t("reportComment")}</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
        </div>
      </div>
      <div className="flex items-start justify-between gap-2">
        <p className={`text-sm mt-2 ${isHidden ? "select-none blur-sm pl-3 pb-2" : ""}`}>
          {isHidden ? t("hiddenByModerator") : comment.body}
        </p>
      </div>

      {!isHidden && (
        <ReactionBar
          workspaceId={comment.workspace_id}
          targetType="comment"
          targetId={comment.id}
          reactionCounts={comment.reactionCounts}
          userReactions={comment.userReactions}
        />
      )}

      <Dialog open={showReportDialog} onOpenChange={setShowReportDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("reportThisComment")}</DialogTitle>
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
            <Button variant="outline" onClick={() => setShowReportDialog(false)}>
              {tc("cancel")}
            </Button>
            <Button onClick={handleReport} disabled={isReporting}>
              {isReporting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {t("submitReport")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export function CommentSection({
  workspaceId,
  itemId,
  comments,
  isItemHidden = false,
}: {
  workspaceId: string;
  itemId: string;
  comments: Comment[];
  isItemHidden?: boolean;
}) {
  const t = useTranslations("feedback");
  const router = useRouter();
  const form = useForm<CreateCommentInput>({
    resolver: zodResolver(createCommentSchema),
    defaultValues: {
      workspaceId,
      itemId,
      body: "",
    },
  });

  async function onSubmit(data: CreateCommentInput) {
    const result = await createComment(data);
    if (result.error) {
      toast.error(result.error);
      return;
    }
    toast.success(t("commentAdded"));
    form.reset();
    router.refresh();
  }

  return (
    <div className="space-y-4">

      {comments.length > 0 && (
        <ScrollArea className={comments.length > 5 ? "h-100" : ""}>
          <div className="space-y-1">
            {comments.map((comment, i) => (
              <div key={comment.id}>
                <CommentItem comment={comment} />
                {i < comments.length - 1 && <Separator />}
              </div>
            ))}
          </div>
        </ScrollArea>
      )}

      {!isItemHidden && <Card>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <FormField
                control={form.control}
                name="body"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder={t("commentPlaceholder")}
                        className="min-h-20"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                size="sm"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {t("commentButton")}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>}
    </div>
  );
}
