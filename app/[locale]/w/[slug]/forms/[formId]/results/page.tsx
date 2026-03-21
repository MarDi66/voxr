import { redirect } from "next/navigation";
import { Link } from "@/lib/i18n/navigation";
import { ArrowLeft } from "lucide-react";
import { getWorkspaceBySlug, getFormResults, checkUserRole } from "@/lib/supabase/queries";
import { FormResults } from "@/components/forms/form-results";
import { Button } from "@/components/ui/button";

export default async function FormResultsPage({
  params,
}: {
  params: Promise<{ slug: string; formId: string }>;
}) {
  const { slug, formId } = await params;
  const workspace = await getWorkspaceBySlug(slug);

  if (!workspace) {
    redirect("/onboarding");
  }

  const [formData, role] = await Promise.all([
    getFormResults(formId),
    checkUserRole(workspace.id),
  ]);

  if (!formData || formData.workspace_id !== workspace.id) {
    redirect(`/w/${slug}`);
  }

  // Private forms: only owner or admin can view results
  const isOwner = role === "owner" || role === "admin";
  if (formData.visibility === "private" && !isOwner) {
    redirect(`/w/${slug}`);
  }

  return (
    <div className="space-y-6">
      <Link href={`/w/${slug}`} className="inline-block">
        <Button variant="ghost" size="sm" className="gap-1.5">
          <ArrowLeft className="h-4 w-4" />
          Back to feed
        </Button>
      </Link>

      <FormResults
        formId={formId}
        title={formData.title}
        description={formData.description}
        visibility={formData.visibility}
        status={formData.status}
        questions={formData.questions}
        responseCount={formData.responseCount}
        memberCount={formData.memberCount}
        answersByQuestion={formData.answersByQuestion}
        isOwner={isOwner}
      />
    </div>
  );
}
