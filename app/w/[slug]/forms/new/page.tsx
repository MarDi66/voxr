import { redirect } from "next/navigation";
import { getWorkspaceBySlug, checkUserRole } from "@/lib/supabase/queries";
import { CreateFormBuilder } from "@/components/forms/create-form-builder";

export default async function NewFormPage({
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
  if (role !== "owner" && role !== "admin") {
    redirect(`/w/${slug}`);
  }

  return (
    <div className="mx-auto">
      <CreateFormBuilder workspaceId={workspace.id} slug={slug} />
    </div>
  );
}
