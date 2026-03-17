import Link from "next/link";
import {
  ArrowRight,
  MessageSquareText,
  ShieldCheck,
  Waypoints,
} from "lucide-react";
import { Breadcrumbs } from "@/components/marketing/breadcrumbs";
import { JsonLd } from "@/components/marketing/json-ld";
import {
  buildMetadata,
  breadcrumbSchema,
  faqSchema,
  webApplicationSchema,
} from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Voxr Product Overview",
  description:
    "Explore the Voxr product: anonymous internal feedback, private workspaces, comments, reactions, and forms for modern teams.",
  path: "/product",
});

const faqItems = [
  {
    question: "What can employees share in Voxr?",
    answer:
      "Employees can share anonymous feedback, ideas, praise, concerns, comments, and structured form responses inside their workspace.",
  },
  {
    question: "Is Voxr a public community platform?",
    answer:
      "No. Voxr is designed for private internal use. Feedback is visible only to members of the same workspace.",
  },
  {
    question: "Why include both posts and forms?",
    answer:
      "Open-ended posts are useful when employees need speed and candor. Forms help when teams need more structure for recurring collection moments.",
  },
];

const productCapabilities = [
  {
    icon: MessageSquareText,
    title: "Anonymous feedback feed",
    body: "Capture day-to-day input in a living workspace feed instead of burying it in one-way submissions.",
  },
  {
    icon: Waypoints,
    title: "Comments, reactions, and follow-through",
    body: "Keep useful feedback visible enough for clarification, discussion, and action instead of letting it disappear into a backlog.",
  },
  {
    icon: ShieldCheck,
    title: "Private workspace model",
    body: "Scope feedback to the relevant workspace so the conversation stays contextual and safer for employees.",
  },
];

export default function ProductPage() {
  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Product", href: "/product" },
  ];

  return (
    <main className="mx-auto max-w-5xl px-6 py-12 sm:py-16">
      <div className="space-y-6">
        <Breadcrumbs items={crumbs} />
        <section className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-end">
          <div className="space-y-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c45d3e]">
              Product
            </p>
            <h1 className="max-w-3xl font-display text-4xl font-medium tracking-tight sm:text-5xl">
              Voxr gives each team a private place for honest internal feedback.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-[#8A857C]">
              The product is designed around anonymous internal company feedback.
              Employees can share ideas, praise, concerns, and comments inside a
              workspace where the discussion stays relevant to the members who
              need it.
            </p>
          </div>
          <div className="rounded-2xl border border-[#c45d3e]/20 bg-[#c45d3e]/10 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#c45d3e]">
              Product summary
            </p>
            <p className="mt-4 text-sm leading-7 text-[#B0ACA4]">
              Voxr is a SaaS for anonymous internal company feedback. It helps
              teams collect honest input without forcing employees into exposed
              internal channels.
            </p>
          </div>
        </section>
      </div>

      <div className="mt-4 h-px bg-gradient-to-r from-[#c45d3e]/40 via-[#2A2722] to-transparent" />

      <section className="mt-14 grid gap-6 lg:grid-cols-3">
        {productCapabilities.map((item) => (
          <article
            key={item.title}
            className="group rounded-2xl border border-[#2A2722] bg-[#171613] p-8 transition-all hover:border-[#3A3630]"
          >
            <div className="inline-flex rounded-xl bg-[#4a7c59]/15 p-3 text-[#4a7c59]">
              <item.icon className="h-5 w-5" aria-hidden="true" />
            </div>
            <h2 className="mt-6 font-display text-xl font-medium tracking-tight">
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
              Built for the truth employees usually hold back
            </h2>
            <p className="max-w-3xl text-base leading-7 text-[#8A857C]">
              Voxr is not a general social feed. It is designed for the internal
              feedback moments that are easy to suppress in visible channels:
              frustrations, ideas, concerns, process observations, and praise
              employees want to share without creating unnecessary exposure.
            </p>
          </article>

          <article className="space-y-4">
            <h2 className="font-display text-3xl font-medium tracking-tight">
              One product for open feedback and structured collection
            </h2>
            <p className="max-w-3xl text-base leading-7 text-[#8A857C]">
              Teams can use feedback posts for always-on employee voice and use
              forms when they need more structure. That makes Voxr practical for
              day-to-day input and deliberate collection campaigns without
              fragmenting the workflow.
            </p>
          </article>

          <article className="space-y-4">
            <h2 className="font-display text-3xl font-medium tracking-tight">
              Better fit for modern teams and startups
            </h2>
            <p className="max-w-3xl text-base leading-7 text-[#8A857C]">
              Voxr works well for teams that want a lightweight internal feedback
              loop instead of another heavy process. The workspace model keeps
              context intact while making honest communication easier to sustain.
            </p>
          </article>
        </div>

        <aside className="rounded-2xl border border-[#2A2722] bg-[#171613] p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#c45d3e]">
            Continue exploring
          </p>
          <ul className="mt-5 space-y-5">
            <li>
              <Link href="/features" className="group block space-y-1">
                <span className="text-sm font-medium text-[#EAE6DF] transition-colors group-hover:text-[#c45d3e]">
                  Features
                </span>
                <span className="block text-sm leading-6 text-[#8A857C]">
                  See the capabilities that support private feedback workflows.
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="/solutions/anonymous-feedback-software"
                className="group block space-y-1"
              >
                <span className="text-sm font-medium text-[#EAE6DF] transition-colors group-hover:text-[#c45d3e]">
                  Anonymous feedback software
                </span>
                <span className="block text-sm leading-6 text-[#8A857C]">
                  Match the product to the search intent behind the category.
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="/guides/how-to-collect-anonymous-employee-feedback"
                className="group block space-y-1"
              >
                <span className="text-sm font-medium text-[#EAE6DF] transition-colors group-hover:text-[#c45d3e]">
                  Collection guide
                </span>
                <span className="block text-sm leading-6 text-[#8A857C]">
                  Learn how to roll out the channel responsibly.
                </span>
              </Link>
            </li>
          </ul>
        </aside>
      </section>

      <section className="mt-16 grid gap-10 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c45d3e]">
            FAQ
          </p>
          <h2 className="font-display text-3xl font-medium tracking-tight">
            Common product questions
          </h2>
        </div>
        <div className="divide-y divide-[#2A2722]">
          {faqItems.map((faq) => (
            <details key={faq.question} className="group py-5 first:pt-0">
              <summary className="flex cursor-pointer items-center justify-between gap-4 text-base font-medium text-[#EAE6DF] transition-colors hover:text-[#c45d3e]">
                {faq.question}
                <span className="shrink-0 text-[#5C5850] transition-transform duration-200 group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm leading-7 text-[#8A857C]">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </section>

      <section className="mt-16 overflow-hidden rounded-2xl bg-[#c45d3e] p-8 text-white shadow-xl shadow-[#c45d3e]/10 sm:p-10">
        <h2 className="font-display text-3xl font-medium tracking-tight">
          See whether Voxr fits your internal feedback model
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-white/80">
          Use Voxr when your team needs honest employee feedback inside a private
          workspace instead of another exposed channel or static suggestion box.
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
            href="/features"
            className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-6 py-3 text-sm font-medium text-white transition-colors hover:border-white/60"
          >
            Review features
          </Link>
        </div>
      </section>

      <JsonLd
        data={[
          breadcrumbSchema(crumbs),
          webApplicationSchema(),
          faqSchema(faqItems),
        ]}
      />
    </main>
  );
}
