"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import { ClipboardList, Eye, Lock, Users, BarChart3, XCircle } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";

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
  const t = useTranslations("forms");
  const isClosed = form.status === "closed";

  return (
    <Card className={isClosed ? "ring-2 ring-muted opacity-75" : "ring-2 ring-blue-400/30"}>
      <CardHeader className="pb-2">
        <div className="flex flex-col-reverse sm:flex-row items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <ClipboardList className="h-4 w-4 shrink-0 text-blue-600" />
            <CardTitle className="text-base leading-snug">{form.title}</CardTitle>
          </div>
          <div className="flex items-center gap-1.5">
            {isClosed && (
              <Badge variant="destructive" className="gap-1">
                <XCircle className="h-3 w-3" />
                {t("closed")}
              </Badge>
            )}
            <Badge variant="secondary" className="gap-1">
              {form.visibility === "public" ? (
                <Eye className="h-3 w-3" />
              ) : (
                <Lock className="h-3 w-3" />
              )}
              {form.visibility === "public" ? t("public") : t("private")}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {form.description && (
          <p className="mb-6 sm:mb-3 line-clamp-2 text-sm text-muted-foreground">
            {form.description}
          </p>
        )}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span>{new Date(form.created_at).toLocaleDateString()}</span>
            <span className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              {t("responseCount", { count: form.responseCount })}
            </span>
          </div>
          <div className="flex gap-2">
            {isOwner && (
              <Link href={`/w/${slug}/forms/${form.id}/results`}>
                <Button variant="outline" size="sm" className="gap-1.5">
                  <BarChart3 className="h-3.5 w-3.5" />
                  {t("results")}
                </Button>
              </Link>
            )}
            {form.visibility === "public" && !isOwner && (
              <Link href={`/w/${slug}/forms/${form.id}/results`}>
                <Button variant="outline" size="sm" className="gap-1.5">
                  <BarChart3 className="h-3.5 w-3.5" />
                  {t("results")}
                </Button>
              </Link>
            )}
            {form.hasResponded ? (
              <div className={buttonVariants({ variant: "ghost", size: "sm" })}>
                {t("completed")}
              </div>
            ) : !isClosed ? (
              <Link href={`/w/${slug}/forms/${form.id}`}>
                <Button
                  size="sm"
                  variant="default"
                >
                  {t("fillOut")}
                </Button>
              </Link>
            ) : null}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
