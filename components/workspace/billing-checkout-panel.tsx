"use client";

import { useState } from "react";
import { useRouter } from "@/lib/i18n/navigation";
import { Link } from "@/lib/i18n/navigation";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { createWorkspace } from "@/actions/workspaces";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createWorkspaceSchema } from "@/lib/validators/workspaces";
import { comparePlanOrder, type BillablePlanKey, type PlanKey } from "@/lib/billing/plans";

function generateSlug(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .substring(0, 30);
}

export function BillingCheckoutPanel({
  plan,
  workspaces,
}: {
  plan: BillablePlanKey;
  workspaces: { id: string; name: string; slug: string; currentPlanKey: PlanKey }[];
}) {
  const t = useTranslations("billing");
  const tw = useTranslations("workspace");
  const router = useRouter();
  const [startingWorkspaceId, setStartingWorkspaceId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");

  function goToCheckout(workspaceId: string) {
    setStartingWorkspaceId(workspaceId);
    router.push(`/checkout/${plan}?workspaceId=${workspaceId}`);
  }

  async function handleCreateWorkspace() {
    const parsed = createWorkspaceSchema.safeParse({ name, slug });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }

    setIsCreating(true);
    const result = await createWorkspace(parsed.data);
    setIsCreating(false);

    if (result.error || !result.workspaceId) {
      toast.error(result.error ?? t("workspaceCreateFailed"));
      return;
    }

    toast.success(t("workspaceReadyForCheckout"));
    router.push(`/checkout/${plan}?workspaceId=${result.workspaceId}`);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>{t("selectWorkspaceTitle")}</CardTitle>
          <CardDescription>{t("selectWorkspaceDescription")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {workspaces.length === 0 ? (
            <p className="text-sm text-muted-foreground">{t("noOwnedWorkspaces")}</p>
          ) : (
            workspaces.map((workspace) => (
              <div key={workspace.id} className="rounded-lg border p-4">
                <div className="flex items-center justify-between gap-4">
                  <p className="font-medium">{workspace.name}</p>
                  {workspace.currentPlanKey === plan ? (
                    <Link href={`/w/${workspace.slug}/settings?tab=billing`}>
                      <Button variant="outline">{t("viewBilling")}</Button>
                    </Link>
                  ) : (
                    <Button
                      onClick={() => goToCheckout(workspace.id)}
                      disabled={startingWorkspaceId === workspace.id}
                    >
                      {startingWorkspaceId === workspace.id ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : null}
                      {workspace.currentPlanKey !== "free" &&
                      comparePlanOrder(workspace.currentPlanKey, plan) < 0
                        ? t("upgradeWorkspace")
                        : t("continueToCheckout")}
                    </Button>
                  )}
                </div>
                <div className="mt-3">
                  <p className="text-sm text-muted-foreground">
                    {t("workspaceCurrentPlan", {
                      plan: t(
                        `plan${workspace.currentPlanKey[0].toUpperCase()}${workspace.currentPlanKey.slice(1)}`
                      ),
                    })}
                  </p>
                  {workspace.currentPlanKey === plan ? (
                    <p className="mt-1 text-sm text-muted-foreground">
                      {t("alreadyOnSelectedPlan")}
                    </p>
                  ) : workspace.currentPlanKey !== "free" &&
                    comparePlanOrder(workspace.currentPlanKey, plan) < 0 ? (
                    <p className="mt-1 text-sm text-muted-foreground">
                      {t("upgradeFromCurrentPlan", {
                        plan: t(
                          `plan${workspace.currentPlanKey[0].toUpperCase()}${workspace.currentPlanKey.slice(1)}`
                        ),
                      })}
                    </p>
                  ) : null}
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t("createBeforeCheckoutTitle")}</CardTitle>
          <CardDescription>{t("createBeforeCheckoutDescription")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="checkout-workspace-name">{tw("nameLabel")}</Label>
            <Input
              id="checkout-workspace-name"
              value={name}
              placeholder={tw("namePlaceholder")}
              onChange={(event) => {
                setName(event.target.value);
                if (!slug || slug === generateSlug(name)) {
                  setSlug(generateSlug(event.target.value));
                }
              }}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="checkout-workspace-slug">{tw("urlLabel")}</Label>
            <Input
              id="checkout-workspace-slug"
              value={slug}
              placeholder={tw("urlPlaceholder")}
              onChange={(event) => setSlug(event.target.value)}
            />
          </div>
          <Button onClick={handleCreateWorkspace} disabled={isCreating}>
            {isCreating ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            {t("createAndContinueToCheckout")}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
