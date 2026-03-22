"use client";

import { useState } from "react";
import { useRouter } from "@/lib/i18n/navigation";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { claimSubscriptionToWorkspace, createWorkspaceAndClaimSubscription } from "@/actions/billing";
import { getActionErrorMessage } from "@/lib/action-error-message";
import { createWorkspaceSchema } from "@/lib/validators/workspaces";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function generateSlug(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .substring(0, 30);
}

export function BillingClaimPanel({
  sessionId,
  subscriptionId,
  workspaces,
}: {
  sessionId?: string;
  subscriptionId?: string;
  workspaces: { id: string; name: string; slug: string }[];
}) {
  const t = useTranslations("billing");
  const tw = useTranslations("workspace");
  const te = useTranslations("billingErrors");
  const router = useRouter();
  const [claimingWorkspaceId, setClaimingWorkspaceId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");

  async function handleClaimWorkspace(workspaceId: string) {
    setClaimingWorkspaceId(workspaceId);
    const result = await claimSubscriptionToWorkspace({
      sessionId,
      subscriptionId,
      workspaceId,
    });
    setClaimingWorkspaceId(null);

    if (result.error) {
      toast.error(getActionErrorMessage(result.error, te));
      return;
    }

    toast.success(t("subscriptionAttached"));
    router.push(`/w/${result.slug}/settings?tab=billing`);
  }

  async function handleCreateWorkspace() {
    const parsed = createWorkspaceSchema.safeParse({
      name,
      slug,
    });

    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }

    setIsCreating(true);
    const result = await createWorkspaceAndClaimSubscription({
      sessionId,
      subscriptionId,
      name: parsed.data.name,
      slug: parsed.data.slug,
    });
    setIsCreating(false);

    if (result.error) {
      toast.error(getActionErrorMessage(result.error, te));
      return;
    }

    toast.success(t("workspaceCreatedAndAttached"));
    router.push(`/w/${result.slug}/settings?tab=billing`);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>{t("attachExistingWorkspace")}</CardTitle>
          <CardDescription>{t("attachExistingWorkspaceDescription")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {workspaces.length === 0 ? (
            <p className="text-sm text-muted-foreground">{t("noOwnedWorkspaces")}</p>
          ) : (
            workspaces.map((workspace) => (
              <div
                key={workspace.id}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div>
                  <p className="font-medium">{workspace.name}</p>
                  <p className="text-sm text-muted-foreground">/{workspace.slug}</p>
                </div>
                <Button
                  onClick={() => handleClaimWorkspace(workspace.id)}
                  disabled={claimingWorkspaceId === workspace.id}
                >
                  {claimingWorkspaceId === workspace.id && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {t("attach")}
                </Button>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t("createWorkspaceTitle")}</CardTitle>
          <CardDescription>{t("createWorkspaceDescription")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="billing-claim-name">{tw("nameLabel")}</Label>
            <Input
              id="billing-claim-name"
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
            <Label htmlFor="billing-claim-slug">{tw("urlLabel")}</Label>
            <Input
              id="billing-claim-slug"
              value={slug}
              placeholder={tw("urlPlaceholder")}
              onChange={(event) => setSlug(event.target.value)}
            />
          </div>
          <Button onClick={handleCreateWorkspace} disabled={isCreating}>
            {isCreating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {t("createAndAttach")}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
