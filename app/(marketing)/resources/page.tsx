import { HubPage } from "@/components/marketing/hub-page";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import { resourcePages } from "@/lib/site-content";

export const metadata = buildMetadata({
  title: "Anonymous Feedback Templates and Resources",
  description:
    "Browse Voxr templates and resources for employee feedback collection, anonymous feedback policy writing, and manager responses.",
  path: "/resources",
});

export default function ResourcesHubPage() {
  return (
    <HubPage
      eyebrow="Resources"
      title="Templates and practical resources for anonymous internal feedback"
      description="Use these public resources to improve feedback quality, clarify policy expectations, and help managers respond in a way that preserves trust."
      crumbs={[
        { label: "Home", href: "/" },
        { label: "Resources", href: "/resources" },
      ]}
      items={resourcePages.map((page) => ({
        href: page.path,
        label: page.title,
        description: page.description,
      }))}
      cta={{
        title: "Use the templates inside a real feedback system",
        body: "Voxr lets teams combine policy, collection, and follow-through inside a private workspace rather than scattering them across disconnected tools.",
        primaryHref: "/auth",
        primaryLabel: "Create a workspace",
        secondaryHref: "/features",
        secondaryLabel: "Review product features",
      }}
      schema={[
        breadcrumbSchema([
          { label: "Home", href: "/" },
          { label: "Resources", href: "/resources" },
        ]),
      ]}
    />
  );
}
