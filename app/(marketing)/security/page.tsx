import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/marketing/breadcrumbs";
import { JsonLd } from "@/components/marketing/json-ld";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Security and Privacy for Anonymous Internal Feedback",
  description:
    "Review how Voxr describes security and privacy for anonymous internal feedback, including private workspace visibility and careful product positioning.",
  path: "/security",
});

const securityPrinciples = [
  {
    title: "Private by product model",
    body: "Voxr is built for internal company use. Feedback is visible only to members of the same workspace rather than being published publicly.",
  },
  {
    title: "Clearer trust boundaries",
    body: "The public site describes the product plainly so teams can understand what the private workspace model is designed to do without inflated claims.",
  },
  {
    title: "Useful for sensitive internal communication",
    body: "The goal is to make honest employee feedback easier to share while keeping the conversation scoped to the relevant internal group.",
  },
];

export default function SecurityPage() {
  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Security", href: "/security" },
  ];

  return (
    <main className="mx-auto max-w-5xl px-6 py-12 sm:py-16">
      <div className="space-y-6">
        <Breadcrumbs items={crumbs} />
        <section className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-end">
          <div className="space-y-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c45d3e]">
              Security and privacy
            </p>
            <h1 className="max-w-3xl font-display text-4xl font-medium tracking-tight sm:text-5xl">
              A security and privacy page that matches the actual product model.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-[#8A857C]">
              Voxr is a private SaaS for anonymous internal company feedback. The
              product is positioned around safer internal communication inside
              workspaces, and this page is intentionally careful not to invent
              guarantees the product does not claim.
            </p>
          </div>
          <div className="rounded-2xl border border-[#4a7c59]/20 bg-[#4a7c59]/10 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#4a7c59]">
              What this page is for
            </p>
            <p className="mt-4 text-sm leading-7 text-[#B0ACA4]">
              Help evaluators understand the trust boundaries of the product:
              private workspace visibility, anonymous internal feedback, and a
              product description that stays grounded in what is actually known.
            </p>
          </div>
        </section>
      </div>

      <div className="mt-4 h-px bg-linear-to-r from-[#4a7c59]/40 via-[#2A2722] to-transparent" />

      <section className="mt-14 grid gap-6 lg:grid-cols-3">
        {securityPrinciples.map((item, index) => (
          <article
            key={item.title}
            className="group rounded-2xl border border-[#2A2722] bg-[#171613] p-8 transition-all hover:border-[#3A3630]"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#4a7c59]/15 text-xs font-bold text-[#4a7c59]">
              {index + 1}
            </span>
            <h2 className="mt-5 font-display text-xl font-medium tracking-tight">
              {item.title}
            </h2>
            <p className="mt-3 text-sm leading-7 text-[#8A857C]">
              {item.body}
            </p>
          </article>
        ))}
      </section>

      <section className="mt-16 grid gap-12 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <div className="space-y-12">
          <article className="space-y-4">
            <h2 className="font-display text-3xl font-medium tracking-tight">
              Private workspace visibility
            </h2>
            <p className="max-w-3xl text-base leading-7 text-[#8A857C]">
              Voxr is designed so employees inside a workspace can share
              anonymous feedback, ideas, praise, concerns, and comments visible
              only to members of that same workspace. That is the core public
              trust boundary the site can explain clearly.
            </p>
          </article>

          <article className="space-y-4">
            <h2 className="font-display text-3xl font-medium tracking-tight">
              Honest positioning instead of inflated security copy
            </h2>
            <p className="max-w-3xl text-base leading-7 text-[#8A857C]">
              This implementation avoids unverifiable claims, fake compliance
              language, or invented assurances. Teams reviewing the product
              should be able to understand the model quickly without marketing
              noise.
            </p>
          </article>

          <article className="space-y-4">
            <h2 className="font-display text-3xl font-medium tracking-tight">
              A practical next step for evaluators
            </h2>
            <p className="max-w-3xl text-base leading-7 text-[#8A857C]">
              If the trust model fits your team, the next evaluation step is to
              review the product and feature pages and decide how you want to run
              feedback ownership, moderation, and follow-through internally.
            </p>
          </article>
        </div>
        <aside className="rounded-2xl border border-[#2A2722] bg-[#171613] p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#c45d3e]">
            Recommended reading
          </p>
          <ul className="mt-5 space-y-5">
            <li>
              <Link href="/product" className="group block space-y-1">
                <span className="text-sm font-medium text-[#EAE6DF] transition-colors group-hover:text-[#c45d3e]">
                  Product overview
                </span>
                <span className="block text-sm leading-6 text-[#8A857C]">
                  Understand how the workspace model works at a high level.
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="/guides/workplace-trust-feedback-guide"
                className="group block space-y-1"
              >
                <span className="text-sm font-medium text-[#EAE6DF] transition-colors group-hover:text-[#c45d3e]">
                  Workplace trust guide
                </span>
                <span className="block text-sm leading-6 text-[#8A857C]">
                  See why trust matters as much as software in feedback systems.
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="/resources/anonymous-feedback-policy-template"
                className="group block space-y-1"
              >
                <span className="text-sm font-medium text-[#EAE6DF] transition-colors group-hover:text-[#c45d3e]">
                  Policy template
                </span>
                <span className="block text-sm leading-6 text-[#8A857C]">
                  Write clear expectations around visibility and response.
                </span>
              </Link>
            </li>
          </ul>
        </aside>
      </section>

      <section className="mt-16 overflow-hidden rounded-2xl bg-[#c45d3e] p-8 text-white shadow-xl shadow-[#c45d3e]/10 sm:p-10">
        <h2 className="font-display text-3xl font-medium tracking-tight">
          Evaluate Voxr with the real trust boundaries in view
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-white/80">
          Use Voxr when your team wants a private channel for anonymous internal
          feedback and a public-facing product explanation that stays grounded in
          what the software is actually designed to do.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/auth"
            className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-[#c45d3e] transition-all hover:-translate-y-px hover:shadow-md"
          >
            Create a workspace
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/product"
            className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-6 py-3 text-sm font-medium text-white transition-colors hover:border-white/60"
          >
            See the product
          </Link>
        </div>
      </section>

      <JsonLd data={[breadcrumbSchema(crumbs)]} />
    </main>
  );
}
