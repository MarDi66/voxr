"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

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

import { createCommentSchema, type CreateCommentInput } from "@/lib/validators/feedback";
import { createComment } from "@/actions/comments";
import { ReactionBar } from "./reaction-bar";

type Comment = {
  id: string;
  workspace_id: string;
  item_id: string;
  body: string;
  status: string;
  created_at: string;
  is_own: boolean;
  reactionCounts: Record<string, number>;
  userReactions: string[];
};

function CommentItem({
  comment,
}: {
  comment: Comment;
}) {
  return (
    <div className="space-y-2 py-3">
      <p className="text-sm">{comment.body}</p>
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <span>{new Date(comment.created_at).toLocaleString()}</span>
      </div>
      <ReactionBar
        workspaceId={comment.workspace_id}
        targetType="comment"
        targetId={comment.id}
        reactionCounts={comment.reactionCounts}
        userReactions={comment.userReactions}
      />
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
      <h3 className="font-semibold">
        Comments ({comments.length})
      </h3>

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
