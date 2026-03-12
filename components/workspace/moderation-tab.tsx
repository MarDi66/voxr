"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Eye, EyeOff, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
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

import { resolveReport, getReports } from "@/actions/moderation";
import { setItemStatus } from "@/actions/feedback";
import { setCommentStatus } from "@/actions/comments";
import { createClient } from "@/lib/supabase/client";

type Report = {
  id: string;
  workspace_id: string;
  target_type: string;
  target_id: string;
  reason: string | null;
  status: string;
  created_at: string;
};

type HiddenItem = {
  id: string;
  title: string;
  category: string;
  status: string;
};

export function ModerationTab({ workspaceId }: { workspaceId: string }) {
  const [reports, setReports] = useState<Report[]>([]);
  const [hiddenItems, setHiddenItems] = useState<HiddenItem[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchData() {
    const [reportsResult] = await Promise.all([
      getReports(workspaceId),
    ]);

    setReports(reportsResult.data || []);

    // Fetch hidden items
    const supabase = createClient();
    const { data: hidden } = await supabase
      .from("feedback_items")
      .select("id, title, category, status")
      .eq("workspace_id", workspaceId)
      .eq("status", "hidden");

    setHiddenItems(hidden || []);
    setLoading(false);
  }

  useEffect(() => {
    let cancelled = false;
    Promise.all([getReports(workspaceId)]).then(async ([reportsResult]) => {
      if (cancelled) return;
      setReports(reportsResult.data || []);

      const supabase = createClient();
      const { data: hidden } = await supabase
        .from("feedback_items")
        .select("id, title, category, status")
        .eq("workspace_id", workspaceId)
        .eq("status", "hidden");

      if (!cancelled) {
        setHiddenItems(hidden || []);
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

  async function handleUnhide(itemId: string) {
    const result = await setItemStatus(itemId, "published");
    if (result.error) {
      toast.error(result.error);
      return;
    }
    toast.success("Item restored");
    fetchData();
  }

  const pendingReports = reports.filter((r) => r.status === "pending");
  const resolvedReports = reports.filter((r) => r.status !== "pending");

  return (
    <Tabs defaultValue="reports">
      <TabsList>
        <TabsTrigger value="reports">
          Reports {pendingReports.length > 0 && `(${pendingReports.length})`}
        </TabsTrigger>
        <TabsTrigger value="hidden">
          Hidden Content {hiddenItems.length > 0 && `(${hiddenItems.length})`}
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
                      <AlertDialogTrigger render={<Button variant="ghost" size="sm" />}>
                        <EyeOff className="mr-1 h-4 w-4" />
                        Hide Content
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Hide this content?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This will hide the reported content from all workspace members.
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
                    >
                      <X className="mr-1 h-4 w-4" />
                      Dismiss
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {report.reason && (
                  <p className="text-sm">{report.reason}</p>
                )}
                {!report.reason && (
                  <p className="text-sm text-muted-foreground italic">
                    No reason provided
                  </p>
                )}
              </CardContent>
            </Card>
          ))
        )}

        {resolvedReports.length > 0 && (
          <>
            <Separator />
            <h3 className="font-semibold text-sm text-muted-foreground">
              Resolved ({resolvedReports.length})
            </h3>
            {resolvedReports.map((report) => (
              <Card key={report.id} className="opacity-60">
                <CardContent className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{report.target_type}</Badge>
                    <span className="text-xs text-muted-foreground">
                      {report.reason || "No reason"}
                    </span>
                  </div>
                  <Badge
                    variant={report.status === "resolved" ? "default" : "secondary"}
                  >
                    {report.status}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </>
        )}
      </TabsContent>

      <TabsContent value="hidden" className="mt-4 space-y-4">
        {hiddenItems.length === 0 ? (
          <Card>
            <CardContent className="py-6 text-center text-sm text-muted-foreground">
              No hidden content
            </CardContent>
          </Card>
        ) : (
          hiddenItems.map((item) => (
            <Card key={item.id}>
              <CardContent className="flex items-center justify-between py-3">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{item.category}</Badge>
                  <span className="text-sm font-medium">{item.title}</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleUnhide(item.id)}
                >
                  <Eye className="mr-1 h-4 w-4" />
                  Unhide
                </Button>
              </CardContent>
            </Card>
          ))
        )}
      </TabsContent>
    </Tabs>
  );
}
