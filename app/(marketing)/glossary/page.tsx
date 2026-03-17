import { HubPage } from "@/components/marketing/hub-page";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import { glossaryPages } from "@/lib/site-content";

export const metadata = buildMetadata({
  title: "Employee Feedback Glossary",
  description:
    "Browse the Voxr glossary for anonymous feedback, employee voice, suggestion boxes, and workplace trust in modern internal feedback systems.",
  path: "/glossary",
});

export default function GlossaryHubPage() {
  return (
    <HubPage
      eyebrow="Glossary"
      title="Definition pages for the language around anonymous employee feedback"
      description="The glossary pages make the core concepts easy to define, quote, and cite: anonymous feedback, employee voice, suggestion boxes, and workplace trust."
      crumbs={[
        { label: "Home", href: "/" },
        { label: "Glossary", href: "/glossary" },
      ]}
      items={glossaryPages.map((page) => ({
        href: page.path,
        label: page.title,
        description: page.description,
      }))}
      cta={{
        title: "Move from definitions to practical implementation",
        body: "Once the terminology is clear, use the guides and solution pages to build a better anonymous internal feedback system around it.",
        primaryHref: "/guides",
        primaryLabel: "Open guides",
        secondaryHref: "/solutions",
        secondaryLabel: "Open solution pages",
      }}
      schema={[
        breadcrumbSchema([
          { label: "Home", href: "/" },
          { label: "Glossary", href: "/glossary" },
        ]),
      ]}
    />
  );
}
