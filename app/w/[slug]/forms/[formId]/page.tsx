import { redirect } from "next/navigation";
import { getWorkspaceBySlug, getFormDetail } from "@/lib/supabase/queries";
import { FormFiller } from "@/components/forms/form-filler";

export default async function FillFormPage({
  params,
}: {
  params: Promise<{ slug: string; formId: string }>;
}) {
  const { slug, formId } = await params;
  const workspace = await getWorkspaceBySlug(slug);

  if (!workspace) {
    redirect("/onboarding");
  }

  const form = await getFormDetail(formId);
  if (!form || form.workspace_id !== workspace.id) {
    redirect(`/w/${slug}`);
  }

  if (form.hasResponded) {
    redirect(`/w/${slug}/forms/${formId}/results`);
  }

  return (
    <div className="mx-auto">
      <FormFiller
        formId={form.id}
        formTitle={form.title}
        formDescription={form.description}
        questions={form.questions}
        slug={slug}
      />
    </div>
  );
}
