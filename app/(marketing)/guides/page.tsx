import { HubPage } from "@/components/marketing/hub-page";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import { guidePages } from "@/lib/site-content";

export const metadata = buildMetadata({
  title: "Anonymous Employee Feedback Guides",
  description:
    "Browse Voxr guides on anonymous employee feedback, collection best practices, workplace trust, and internal feedback operations.",
  path: "/guides",
});

export default function GuidesHubPage() {
  return (
    <HubPage
      eyebrow="Guides"
      title="Guides for teams building better internal feedback loops"
      description="These guide pages explain the concepts behind anonymous employee feedback, how to collect it well, and how trust shapes whether any internal feedback system actually works."
      crumbs={[
        { label: "Home", href: "/" },
        { label: "Guides", href: "/guides" },
      ]}
      items={guidePages.map((page) => ({
        href: page.path,
        label: page.title,
        description: page.description,
      }))}
      cta={{
        title: "Turn the guidance into a working feedback process",
        body: "Use the guides to shape rollout and response norms, then use Voxr as the private workspace where the process actually runs.",
        primaryHref: "/auth",
        primaryLabel: "Start with Voxr",
        secondaryHref: "/resources",
        secondaryLabel: "Open templates and resources",
      }}
      schema={[
        breadcrumbSchema([
          { label: "Home", href: "/" },
          { label: "Guides", href: "/guides" },
        ]),
      ]}
    />
  );
}
