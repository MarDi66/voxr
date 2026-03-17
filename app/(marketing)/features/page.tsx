import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/marketing/breadcrumbs";
import { JsonLd } from "@/components/marketing/json-ld";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Anonymous Feedback Platform Features",
  description:
    "See the Voxr features built for anonymous internal feedback: private workspaces, posts, comments, reactions, forms, and moderation-friendly workflows.",
  path: "/features",
});

const featureGroups = [
  {
    title: "Private workspace structure",
    points: [
      "Feedback stays visible only to members of the same workspace.",
      "Teams can keep internal discussion contextual instead of broadly exposed.",
      "Useful for startups, departments, and modern distributed teams.",
    ],
  },
  {
    title: "Anonymous feedback posts",
    points: [
      "Employees can share ideas, praise, concerns, and comments.",
      "The feed format keeps ongoing internal feedback easier to revisit.",
      "A better fit than one-off submissions when teams need recurring signals.",
    ],
  },
  {
    title: "Comments and reactions",
    points: [
      "Useful threads can gather context instead of stopping at submission.",
      "Teams can clarify, acknowledge, and discuss what matters.",
      "That improves follow-through without forcing employees into exposed channels.",
    ],
  },
  {
    title: "Forms for structured collection",
    points: [
      "Use forms when teams need more consistency than an open prompt.",
      "Helpful for targeted internal feedback campaigns or recurring check-ins.",
      "Keeps structured collection in the same product as everyday feedback.",
    ],
  },
];

export default function FeaturesPage() {
  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Features", href: "/features" },
  ];

  return (
    <main className="mx-auto max-w-5xl px-6 py-12 sm:py-16">
      <div className="space-y-6">
        <Breadcrumbs items={crumbs} />
        <section className="space-y-5">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c45d3e]">
            Features
          </p>
          <h1 className="max-w-3xl font-display text-4xl font-medium tracking-tight sm:text-5xl">
            Product features built for honest internal feedback, not just
            collection.
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-[#8A857C]">
            Voxr combines private workspaces, anonymous feedback posts, comments,
            reactions, and forms so teams can run a lighter feedback loop without
            splitting the workflow across multiple tools.
          </p>
        </section>
      </div>

      <div className="mt-4 h-px bg-gradient-to-r from-[#c45d3e]/40 via-[#2A2722] to-transparent" />

      <section className="mt-14 grid gap-6 lg:grid-cols-2">
        {featureGroups.map((group, groupIndex) => (
          <article
            key={group.title}
            className="rounded-2xl border border-[#2A2722] bg-[#171613] p-8 transition-all hover:border-[#3A3630]"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#c45d3e]/10 text-xs font-bold text-[#c45d3e]">
                {groupIndex + 1}
              </span>
              <h2 className="font-display text-xl font-medium tracking-tight">
                {group.title}
              </h2>
            </div>
            <ul className="mt-5 space-y-3">
              {group.points.map((point) => (
                <li
                  key={point}
                  className="border-l-2 border-[#2A2722] pl-4 text-sm leading-7 text-[#8A857C] transition-colors hover:border-[#c45d3e]/40"
                >
                  {point}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <section className="mt-16 grid gap-12 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <div className="space-y-12">
          <article className="space-y-4">
            <h2 className="font-display text-3xl font-medium tracking-tight">
              Lightweight enough for day-to-day use
            </h2>
            <p className="max-w-3xl text-base leading-7 text-[#8A857C]">
              Features matter most when employees and managers will actually use
              them repeatedly. Voxr is designed to keep the workflow simple enough
              for frequent use while still giving teams structure when they need
              it.
            </p>
          </article>
          <article className="space-y-4">
            <h2 className="font-display text-3xl font-medium tracking-tight">
              A better fit than disconnected forms and exposed chat channels
            </h2>
            <p className="max-w-3xl text-base leading-7 text-[#8A857C]">
              The feature set is aimed at one practical outcome: more useful
              employee honesty with less friction. That means a private place to
              speak, enough context to understand the issue, and a clear path to
              follow-up.
            </p>
          </article>
        </div>
        <aside className="rounded-2xl border border-[#2A2722] bg-[#171613] p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#c45d3e]">
            Related pages
          </p>
          <ul className="mt-5 space-y-5">
            <li>
              <Link href="/product" className="group block space-y-1">
                <span className="text-sm font-medium text-[#EAE6DF] transition-colors group-hover:text-[#c45d3e]">
                  Product overview
                </span>
                <span className="block text-sm leading-6 text-[#8A857C]">
                  See how the features fit the overall product model.
                </span>
              </Link>
            </li>
            <li>
              <Link href="/security" className="group block space-y-1">
                <span className="text-sm font-medium text-[#EAE6DF] transition-colors group-hover:text-[#c45d3e]">
                  Security and privacy
                </span>
                <span className="block text-sm leading-6 text-[#8A857C]">
                  Review how the product is described for safer internal use.
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="/solutions/internal-feedback-tool"
                className="group block space-y-1"
              >
                <span className="text-sm font-medium text-[#EAE6DF] transition-colors group-hover:text-[#c45d3e]">
                  Internal feedback tool
                </span>
                <span className="block text-sm leading-6 text-[#8A857C]">
                  Connect the features to a higher-intent solution page.
                </span>
              </Link>
            </li>
          </ul>
        </aside>
      </section>

      <section className="mt-16 overflow-hidden rounded-2xl bg-[#c45d3e] p-8 text-white shadow-xl shadow-[#c45d3e]/10 sm:p-10">
        <h2 className="font-display text-3xl font-medium tracking-tight">
          Put these features into a feedback workflow that feels safe enough to
          use
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-white/80">
          Create a Voxr workspace when you want private internal feedback, useful
          discussion, and structured collection in the same product.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/auth"
            className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-[#c45d3e] transition-all hover:-translate-y-px hover:shadow-md"
          >
            Start with Voxr
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/guides/internal-feedback-best-practices"
            className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-6 py-3 text-sm font-medium text-white transition-colors hover:border-white/60"
          >
            Read best practices
          </Link>
        </div>
      </section>

      <JsonLd data={[breadcrumbSchema(crumbs)]} />
    </main>
  );
}
