"use client";

import { Link } from "@/lib/i18n/navigation";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { WorkspaceBillingSummary } from "@/lib/billing/queries";

function formatDate(value: string | null, locale: string) {
  if (!value) {
    return null;
  }

  return new Intl.DateTimeFormat(locale === "fr" ? "fr-FR" : "en-US", {
    dateStyle: "medium",
  }).format(new Date(value));
}

export function BillingTab({
  workspace,
  summary,
  locale,
}: {
  workspace: { id: string; slug: string };
  summary: WorkspaceBillingSummary;
  locale: string;
}) {
  const t = useTranslations("billing");
  const subscription = summary.subscription;
  const periodEnd = formatDate(subscription?.current_period_end ?? null, locale);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("title")}</CardTitle>
        <CardDescription>{t("description")}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <p className="text-sm text-muted-foreground">{t("currentPlan")}</p>
          <p className="text-2xl font-semibold">{t(`plan${summary.planKey[0].toUpperCase()}${summary.planKey.slice(1)}`)}</p>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-lg border p-4">
            <p className="text-sm text-muted-foreground">{t("membersUsage")}</p>
            <p className="mt-1 text-lg font-medium">
              {summary.usage.members} / {summary.limits.members}
            </p>
          </div>
          <div className="rounded-lg border p-4">
            <p className="text-sm text-muted-foreground">{t("feedbackUsage")}</p>
            <p className="mt-1 text-lg font-medium">
              {summary.usage.feedbackItems} / {summary.limits.feedbackItems}
            </p>
          </div>
          <div className="rounded-lg border p-4">
            <p className="text-sm text-muted-foreground">{t("formsUsage")}</p>
            <p className="mt-1 text-lg font-medium">
              {summary.usage.forms} / {summary.limits.forms}
            </p>
          </div>
        </div>

        {subscription && periodEnd ? (
          <div className="rounded-lg border bg-muted/40 p-4 text-sm">
            <p className="font-medium">
              {subscription.cancel_at_period_end
                ? t("accessUntil", { date: periodEnd })
                : t("renewsOn", { date: periodEnd })}
            </p>
            <p className="mt-1 text-muted-foreground">
              {t("statusLabel")}: {t(`status${subscription.status[0].toUpperCase()}${subscription.status.slice(1)}`)}
            </p>
          </div>
        ) : null}

        <div className="flex flex-wrap gap-3">
          {subscription ? (
            <Link
              href={`/billing/portal?workspaceId=${workspace.id}&slug=${workspace.slug}`}
            >
              <Button>{t("manageBilling")}</Button>
            </Link>
          ) : (
            <>
              <Link href={`/checkout/pro?workspaceId=${workspace.id}`}>
                <Button>{t("upgradeToPro")}</Button>
              </Link>
              <Link href={`/checkout/enterprise?workspaceId=${workspace.id}`}>
                <Button>{t("upgradeToEnterprise")}</Button>
              </Link>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
