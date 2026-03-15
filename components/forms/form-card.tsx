import Link from "next/link";
import { ClipboardList, Eye, Lock, Users, BarChart3 } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type FormItem = {
  id: string;
  workspace_id: string;
  title: string;
  description: string | null;
  visibility: string;
  status: string;
  created_at: string;
  responseCount: number;
  hasResponded: boolean;
};

export function FormCard({
  form,
  slug,
  isOwner = false,
}: {
  form: FormItem;
  slug: string;
  isOwner?: boolean;
}) {
  return (
    <Card className="border-primary/30 bg-linear-to-r from-primary/5 to-transparent">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <ClipboardList className="h-5 w-5 shrink-0 text-primary" />
            <CardTitle className="text-base leading-snug">{form.title}</CardTitle>
          </div>
          <div className="flex items-center gap-1.5">
            <Badge variant="secondary" className="gap-1">
              {form.visibility === "public" ? (
                <Eye className="h-3 w-3" />
              ) : (
                <Lock className="h-3 w-3" />
              )}
              {form.visibility === "public" ? "Public" : "Private"}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {form.description && (
          <p className="mb-3 line-clamp-2 text-sm text-muted-foreground">
            {form.description}
          </p>
        )}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span>{new Date(form.created_at).toLocaleDateString()}</span>
            <span className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              {form.responseCount} response{form.responseCount !== 1 && "s"}
            </span>
          </div>
          <div className="flex gap-2">
            {isOwner && (
              <Link href={`/w/${slug}/forms/${form.id}/results`}>
                <Button variant="ghost" size="sm" className="gap-1.5">
                  <BarChart3 className="h-3.5 w-3.5" />
                  Results
                </Button>
              </Link>
            )}
            {form.visibility === "public" && !isOwner && (
              <Link href={`/w/${slug}/forms/${form.id}/results`}>
                <Button variant="ghost" size="sm" className="gap-1.5">
                  <BarChart3 className="h-3.5 w-3.5" />
                  Results
                </Button>
              </Link>
            )}
            <Link href={`/w/${slug}/forms/${form.id}`}>
              <Button
                size="sm"
                variant={form.hasResponded ? "outline" : "default"}
                disabled={form.hasResponded}
              >
                {form.hasResponded ? "Completed" : "Fill out"}
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
