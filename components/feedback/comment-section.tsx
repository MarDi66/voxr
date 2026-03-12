"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2, Flag } from "lucide-react";

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
};

function CommentItem({
  comment,
}: {
  comment: Comment;
}) {
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
    toast.success("Report submitted");
    setReportReason("");
    setShowReportDialog(false);
    router.refresh();
  }

  const isHidden = comment.status === "hidden";

  return (
    <div className="space-y-2 py-3">
      <div className="flex items-start justify-between gap-2">
        <p className={`text-sm ${isHidden ? "select-none blur-sm pl-3 pb-2" : ""}`}>
          {isHidden ? "This comment has been hidden by a moderator." : comment.body}
        </p>
        {!comment.is_own && !isHidden && (
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 shrink-0 text-muted-foreground hover:text-destructive"
            onClick={() => setShowReportDialog(true)}
            title="Report comment"
          >
            <Flag className="h-3.5 w-3.5" />
          </Button>
        )}
      </div>
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <span>{new Date(comment.created_at).toLocaleString()}</span>
        {comment.is_item_author && (
          <Badge variant="secondary" className="text-[10px] px-1.5 py-0 font-normal">
            Author
          </Badge>
        )}
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

      {!isHidden && (
        <Dialog open={showReportDialog} onOpenChange={setShowReportDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Report this comment</DialogTitle>
            <DialogDescription>
              Help us understand why this comment should be reviewed.
            </DialogDescription>
          </DialogHeader>
          <Textarea
            placeholder="Reason for reporting (optional)"
            value={reportReason}
            onChange={(e) => setReportReason(e.target.value)}
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowReportDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleReport} disabled={isReporting}>
              {isReporting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Submit Report
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      )}
    </div>
  );
}

export function CommentSection({
  workspaceId,
  itemId,
  comments,
}: {
  workspaceId: string;
  itemId: string;
  comments: Comment[];
}) {
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
    toast.success("Comment added");
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

      <Card>
        <CardContent className="pt-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <FormField
                control={form.control}
                name="body"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="Write a comment..."
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
                Comment
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
