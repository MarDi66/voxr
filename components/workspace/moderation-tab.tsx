"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Eye, EyeOff, ExternalLink, X } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { resolveReport, getReports } from "@/actions/moderation";
import { setItemStatus, setCommentStatus } from "@/actions/feedback";
import { createClient } from "@/lib/supabase/client";

type ItemPreview = {
  id: string;
  title: string;
  body: string;
  category: string;
};

type CommentPreview = {
  id: string;
  item_id: string;
  body: string;
};

type Report = {
  id: string;
  workspace_id: string;
  target_type: string;
  target_id: string;
  reason: string | null;
  status: string;
  created_at: string;
  target_preview: ItemPreview | CommentPreview | null;
};

type HiddenItem = {
  id: string;
  title: string;
  body: string;
  category: string;
  status: string;
};

type HiddenComment = {
  id: string;
  item_id: string;
  body: string;
  status: string;
};

export function ModerationTab({ workspaceId, slug }: { workspaceId: string; slug: string }) {
  const [reports, setReports] = useState<Report[]>([]);
  const [hiddenItems, setHiddenItems] = useState<HiddenItem[]>([]);
  const [hiddenComments, setHiddenComments] = useState<HiddenComment[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchData() {
    const [reportsResult] = await Promise.all([
      getReports(workspaceId),
    ]);

    setReports(reportsResult.data || []);

    const supabase = createClient();
    const [{ data: hidden }, { data: hiddenCmts }] = await Promise.all([
      supabase
        .from("feedback_items")
        .select("id, title, body, category, status")
        .eq("workspace_id", workspaceId)
        .eq("status", "hidden"),
      supabase
        .from("comments")
        .select("id, item_id, body, status")
        .eq("workspace_id", workspaceId)
        .eq("status", "hidden"),
    ]);

    setHiddenItems(hidden || []);
    setHiddenComments(hiddenCmts || []);
    setLoading(false);
  }

  useEffect(() => {
    let cancelled = false;
    Promise.all([getReports(workspaceId)]).then(async ([reportsResult]) => {
      if (cancelled) return;
      setReports(reportsResult.data || []);

      const supabase = createClient();
      const [{ data: hidden }, { data: hiddenCmts }] = await Promise.all([
        supabase
          .from("feedback_items")
          .select("id, title, body, category, status")
          .eq("workspace_id", workspaceId)
          .eq("status", "hidden"),
        supabase
          .from("comments")
          .select("id, item_id, body, status")
          .eq("workspace_id", workspaceId)
          .eq("status", "hidden"),
      ]);

      if (!cancelled) {
        setHiddenItems(hidden || []);
        setHiddenComments(hiddenCmts || []);
        setLoading(false);
      }
    });
    return () => { cancelled = true; };
  }, [workspaceId]);

  async function handleResolve(reportId: string, action: "resolved" | "dismissed") {
    const result = await resolveReport(reportId, action);
    if (result.error) {
      toast.error(result.error);
      return;
    }
    toast.success(action === "resolved" ? "Report resolved" : "Report dismissed");
    fetchData();
  }

  async function handleUnhideItem(itemId: string) {
    const result = await setItemStatus(itemId, "published");
    if (result.error) {
      toast.error(result.error);
      return;
    }
    toast.success("Feedback restored");
    fetchData();
  }

  async function handleUnhideComment(commentId: string) {
    const result = await setCommentStatus(commentId, "published");
    if (result.error) {
      toast.error(result.error);
      return;
    }
    toast.success("Comment restored");
    fetchData();
  }

  const pendingReports = reports.filter((r) => r.status === "pending");
  const hiddenCount = hiddenItems.length + hiddenComments.length;

  return (
    <Tabs defaultValue="reports">
      <TabsList>
        <TabsTrigger value="reports">
          Reports {pendingReports.length > 0 && `(${pendingReports.length})`}
        </TabsTrigger>
        <TabsTrigger value="hidden">
          Hidden Content {hiddenCount > 0 && `(${hiddenCount})`}
        </TabsTrigger>
      </TabsList>

      <TabsContent value="reports" className="mt-4 space-y-4">
        {loading ? (
          <p className="text-sm text-muted-foreground">Loading...</p>
        ) : pendingReports.length === 0 ? (
          <Card>
            <CardContent className="py-6 text-center text-sm text-muted-foreground">
              No pending reports
            </CardContent>
          </Card>
        ) : (
          pendingReports.map((report) => (
            <Card key={report.id}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{report.target_type}</Badge>
                    <span className="text-xs text-muted-foreground">
                      {new Date(report.created_at).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex gap-1">
                    <AlertDialog>
                      <AlertDialogTrigger render={<Button variant="ghost" size="sm" className="bg-amber-500/10" />}>
                        <EyeOff className="mr-1 h-4 w-4" />
                        Hide Content
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Hide this content?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This will hide the reported {report.target_type === "item" ? "feedback" : "comment"} from all workspace members.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={async () => {
                              if (report.target_type === "item") {
                                await setItemStatus(report.target_id, "hidden");
                              } else {
                                await setCommentStatus(report.target_id, "hidden");
                              }
                              await handleResolve(report.id, "resolved");
                            }}
                          >
                            Hide & Resolve
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleResolve(report.id, "dismissed")}
                      className="bg-destructive/10"
                    >
                      <X className="mr-1 h-4 w-4" />
                      Dismiss
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {/* Reported content preview */}
                <ReportPreview report={report} slug={slug} />

                {/* Report reason */}
                {report.reason ? (
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-1">Reason</p>
                    <p className="text-sm">{report.reason}</p>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground italic">
                    No reason provided
                  </p>
                )}
              </CardContent>
            </Card>
          ))
        )}

      </TabsContent>

      <TabsContent value="hidden" className="mt-4 space-y-4">
        {hiddenCount === 0 ? (
          <Card>
            <CardContent className="py-6 text-center text-sm text-muted-foreground">
              No hidden content
            </CardContent>
          </Card>
        ) : (
          <>
            {hiddenItems.map((item) => (
              <HiddenItemCard
                key={item.id}
                item={item}
                onUnhide={() => handleUnhideItem(item.id)}
              />
            ))}
            {hiddenComments.map((comment) => (
              <HiddenCommentCard
                key={comment.id}
                comment={comment}
                slug={slug}
                onUnhide={() => handleUnhideComment(comment.id)}
              />
            ))}
          </>
        )}
      </TabsContent>
    </Tabs>
  );
}

function getItemIdForReport(report: Report): string {
  if (report.target_type === "item") {
    return report.target_id;
  }
  const preview = report.target_preview as CommentPreview | null;
  return preview?.item_id ?? "";
}

function HiddenItemCard({
  item,
  onUnhide,
}: {
  item: HiddenItem;
  onUnhide: () => void;
}) {
  const [revealed, setRevealed] = useState(false);

  return (
    <Card>
      <CardContent className="py-3 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge variant="outline">feedback</Badge>
            <Badge variant="secondary">{item.category}</Badge>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setRevealed(!revealed)}
            >
              {revealed ? (
                <><EyeOff className="mr-1 h-4 w-4" />Blur</>
              ) : (
                <><Eye className="mr-1 h-4 w-4" />Reveal</>
              )}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onUnhide}
            >
              <Eye className="mr-1 h-4 w-4" />
              Unhide
            </Button>
          </div>
        </div>
        <p className={`text-sm font-medium select-none transition-all ${revealed ? "" : "blur-sm"}`}>{item.title}</p>
        <p className={`text-sm text-muted-foreground line-clamp-2 select-none transition-all ${revealed ? "" : "blur-sm"}`}>{item.body}</p>
      </CardContent>
    </Card>
  );
}

function HiddenCommentCard({
  comment,
  slug,
  onUnhide,
}: {
  comment: HiddenComment;
  slug: string;
  onUnhide: () => void;
}) {
  const [revealed, setRevealed] = useState(false);

  return (
    <Card>
      <CardContent className="py-3 space-y-2">
        <div className="flex items-center justify-between">
          <Badge variant="outline">comment</Badge>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setRevealed(!revealed)}
            >
              {revealed ? (
                <><EyeOff className="mr-1 h-4 w-4" />Blur</>
              ) : (
                <><Eye className="mr-1 h-4 w-4" />Reveal</>
              )}
            </Button>
            <Link
              href={`/w/${slug}/i/${comment.item_id}`}
              className={buttonVariants({ variant: "ghost", size: "sm" })}
            >
              <ExternalLink className="mr-1 h-4 w-4" />
              Go to Feedback
            </Link>
            <Button
              variant="outline"
              size="sm"
              onClick={onUnhide}
            >
              <Eye className="mr-1 h-4 w-4" />
              Unhide
            </Button>
          </div>
        </div>
        <p className={`text-sm text-muted-foreground line-clamp-2 select-none transition-all ${revealed ? "" : "blur-sm"}`}>{comment.body}</p>
      </CardContent>
    </Card>
  );
}

function ReportPreview({ report, slug }: { report: Report; slug: string }) {
  const preview = report.target_preview;
  const itemId = getItemIdForReport(report);

  if (!preview) {
    return (
      <p className="text-sm text-muted-foreground italic">
        Content no longer available
      </p>
    );
  }

  const isItem = report.target_type === "item";
  const itemPreview = isItem ? (preview as ItemPreview) : null;
  const commentPreview = !isItem ? (preview as CommentPreview) : null;

  return (
    <div className="space-y-2">
      {/* Inline preview */}
      <div className="rounded-md border bg-muted/40 p-3">
        {itemPreview && (
          <>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="secondary" className="text-xs">{itemPreview.category}</Badge>
              <span className="text-sm font-medium line-clamp-1">{itemPreview.title}</span>
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2">{itemPreview.body}</p>
          </>
        )}
        {commentPreview && (
          <p className="text-sm text-muted-foreground line-clamp-2">{commentPreview.body}</p>
        )}
      </div>

      {/* Actions: Drawer CTA + Link to feedback page */}
      <div className="flex items-center gap-2">
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="secondary" size="sm">
              <Eye className="h-4 w-4 mr-1" />
              Preview
            </Button>
          </DrawerTrigger>
          <DrawerContent className="max-w-4xl mx-auto">
            <div className="mx-auto w-full">
              <DrawerHeader>
                <DrawerTitle>
                  {itemPreview ? itemPreview.title : "Reported Comment"}
                </DrawerTitle>
                <DrawerDescription>
                  Reported {report.target_type} &middot;{" "}
                  {new Date(report.created_at).toLocaleString()}
                </DrawerDescription>
              </DrawerHeader>
              <div className="px-4 pb-4">
                {itemPreview && (
                  <div className="space-y-3">
                    <Badge variant="secondary">{itemPreview.category}</Badge>
                    <p className="text-sm whitespace-pre-wrap">{itemPreview.body}</p>
                  </div>
                )}
                {commentPreview && (
                  <p className="text-sm whitespace-pre-wrap">{commentPreview.body}</p>
                )}
                {report.reason && (
                  <div className="mt-4 rounded-md border border-destructive/20 bg-destructive/5 p-3">
                    <p className="text-xs font-medium text-destructive mb-1">Report reason</p>
                    <p className="text-sm">{report.reason}</p>
                  </div>
                )}
              </div>
              <DrawerFooter>
                {itemId && (
                  <Link href={`/w/${slug}/i/${itemId}`} className={buttonVariants({ variant: "secondary", })}>
                    Go to Feedback
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                )}
                <DrawerClose asChild>
                  <Button variant="outline">Close</Button>
                </DrawerClose>
              </DrawerFooter>
            </div>
          </DrawerContent>
        </Drawer>

        {itemId && (
          <Link href={`/w/${slug}/i/${itemId}`} className={buttonVariants({ variant: "secondary", size: "sm", })}>
            <ExternalLink className="h-4 w-4 mr-1" />
            Go to Feedback
          </Link>
        )}
      </div>
    </div>
  );
}
