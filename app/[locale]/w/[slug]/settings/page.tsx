import { Link } from "@/lib/i18n/navigation";
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { ArrowLeft } from "lucide-react";
import { getWorkspaceBySlug, checkUserRole } from "@/lib/supabase/queries";
import { SettingsTabs } from "@/components/workspace/settings-tabs";
import { Button } from "@/components/ui/button";

export default async function SettingsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const workspace = await getWorkspaceBySlug(slug);

  if (!workspace) {
    redirect("/onboarding");
  }

  const role = await checkUserRole(workspace.id);
  if (!role) {
    redirect(`/w/${slug}`);
  }

  const t = await getTranslations("workspace");

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Link href={`/w/${slug}`}>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">{t("settingsTitle")}</h1>
      </div>
      <SettingsTabs workspace={workspace} role={role} />
    </div>
  );
}
