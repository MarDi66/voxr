import { redirect } from "next/navigation";
import { getWorkspaceBySlug } from "@/lib/supabase/queries";
import { CreateFeedbackForm } from "@/components/feedback/create-feedback-form";

export default async function NewFeedbackPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const workspace = await getWorkspaceBySlug(slug);

  if (!workspace) {
    redirect("/onboarding");
  }

  return (
    <div className="mx-auto">
      <CreateFeedbackForm workspaceId={workspace.id} slug={slug} />
    </div>
  );
}
