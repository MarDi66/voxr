import Link from "next/link";
import {
  ArrowRight,
  MessageSquareText,
  Shield,
  Users,
} from "lucide-react";
import { JsonLd } from "@/components/marketing/json-ld";
import {
  buildMetadata,
  faqSchema,
  organizationSchema,
  webApplicationSchema,
  websiteSchema,
} from "@/lib/seo";
import { homeCollections } from "@/lib/site-content";

export const metadata = buildMetadata({
  title: "Anonymous Internal Feedback Software for Modern Teams",
  description:
    "Voxr helps teams collect anonymous internal feedback, employee ideas, praise, concerns, and comments inside a private workspace.",
  path: "/",
});

const homeFaqs = [
  {
    question: "What is Voxr?",
    answer:
      "Voxr is a SaaS product for anonymous internal company feedback. Employees can share ideas, praise, concerns, and comments inside a private workspace.",
  },
  {
    question: "Who can see feedback in Voxr?",
    answer:
      "Feedback is visible only to members of the same workspace, which keeps the conversation private to the relevant internal team or company environment.",
  },
  {
    question: "Is Voxr just a suggestion box?",
    answer:
      "No. Voxr is broader than a suggestion box. It supports ongoing internal feedback, comments, reactions, and structured forms when teams need them.",
  },
];

const trustPoints = [
  {
    icon: Shield,
    title: "Psychological safety first",
    body: "Give employees a safer way to raise ideas, friction, and concerns before they become quiet frustration.",
  },
  {
    icon: Users,
    title: "Workspace-based visibility",
    body: "Keep feedback inside the team or company workspace that should see it, instead of scattering sensitive input across exposed channels.",
  },
  {
    icon: MessageSquareText,
    title: "From submission to discussion",
    body: "Move beyond dead-end forms with comments, reactions, and a feed that keeps useful internal feedback visible.",
  },
];

const contentSections = [
  {
    title: "Solution pages",
    items: homeCollections.solutions.slice(0, 4),
  },
  {
    title: "Guides",
    items: homeCollections.guides.slice(0, 4),
  },
  {
    title: "Templates and glossary",
    items: homeCollections.resources.slice(0, 6),
  },
];

export default function HomePage() {
  return (
    <main>
      {/* ── Hero ─────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="absolute left-1/2 top-0 -z-10 h-150 w-150 -translate-x-1/2 -translate-y-1/3 rounded-full bg-[#c45d3e] opacity-[0.06] blur-[120px]" />

        <div className="mx-auto max-w-3xl px-6 pb-20 pt-24 text-center sm:pt-32">
          <div className="mk-animate" style={{ animationDelay: "0ms" }}>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#c45d3e]/20 bg-[#c45d3e]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-[#c45d3e]">
              Anonymous team feedback
            </span>
          </div>

          <h1
            className="mk-animate mx-auto mt-8 max-w-2xl font-display text-5xl font-medium leading-[1.08] tracking-tight sm:text-6xl"
            style={{ animationDelay: "80ms" }}
          >
            Hear what your team really thinks.
          </h1>

          <p
            className="mk-animate mx-auto mt-6 max-w-xl text-lg leading-8 text-[#8A857C]"
            style={{ animationDelay: "160ms" }}
          >
            Voxr is a private workspace where employees share honest, anonymous
            feedback — without fear and without noise.
          </p>

          <div
            className="mk-animate mt-10 flex flex-wrap items-center justify-center gap-5"
            style={{ animationDelay: "240ms" }}
          >
            <Link
              href="/auth"
              className="inline-flex items-center gap-2 rounded-lg bg-[#c45d3e] px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#c45d3e]/20 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#c45d3e]/25"
            >
              Get started free
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/product"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#D0CBC3] transition-colors hover:text-[#c45d3e]"
            >
              See how it works
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Trust points ─────────────────────────── */}
      <section className="border-y border-[#2A2722] bg-[#121110]">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <div className="grid gap-6 lg:grid-cols-3">
            {trustPoints.map((point) => (
              <article
                key={point.title}
                className="group rounded-2xl border border-[#2A2722] bg-[#171613] p-8 transition-all hover:border-[#3A3630]"
              >
                <div className="inline-flex rounded-xl bg-[#4a7c59]/15 p-3 text-[#4a7c59]">
                  <point.icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h2 className="mt-6 font-display text-xl font-medium tracking-tight">
                  {point.title}
                </h2>
                <p className="mt-3 text-sm leading-7 text-[#8A857C]">
                  {point.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Voxr ─────────────────────────────── */}
      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_18rem]">
          <div className="space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c45d3e]">
              Why companies use Voxr
            </p>
            <h2 className="max-w-xl font-display text-4xl font-medium tracking-tight">
              More honest than exposed internal channels. More useful than a
              forgotten suggestion box.
            </h2>
            <div className="flex items-center gap-3">
              <div className="h-px w-12 bg-[#c45d3e]/40" />
              <div className="h-1 w-1 rounded-full bg-[#c45d3e]/40" />
            </div>
            <p className="max-w-2xl text-base leading-7 text-[#8A857C]">
              Voxr is designed for the part of internal communication that often
              breaks down first: the moment an employee decides whether it feels
              safe enough to speak honestly. The product gives teams a
              lightweight feedback loop instead of another survey cadence or
              static form inbox.
            </p>
          </div>
          <div className="rounded-2xl border border-[#2A2722] bg-[#171613] p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#4a7c59]">
              Good fit for
            </p>
            <ul className="mt-5 space-y-3 text-sm leading-7 text-[#8A857C]">
              <li className="border-l-2 border-[#4a7c59]/30 pl-4">
                Startup teams that want earlier feedback signals.
              </li>
              <li className="border-l-2 border-[#4a7c59]/30 pl-4">
                HR and people teams building safer feedback channels.
              </li>
              <li className="border-l-2 border-[#4a7c59]/30 pl-4">
                Operations leaders collecting internal process friction.
              </li>
              <li className="border-l-2 border-[#4a7c59]/30 pl-4">
                Remote and hybrid teams where honesty gets filtered by
                visibility.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ── Discovery hub ────────────────────────── */}
      <section className="border-y border-[#2A2722] bg-[#121110]">
        <div className="mx-auto max-w-5xl space-y-16 px-6 py-16">
          {contentSections.map((section) => (
            <div key={section.title} className="space-y-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c45d3e]">
                  Discoverability hub
                </p>
                <h2 className="mt-2 font-display text-3xl font-medium tracking-tight">
                  {section.title}
                </h2>
              </div>
              <div className="grid gap-4 lg:grid-cols-3">
                {section.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group rounded-2xl border border-[#2A2722] bg-[#171613] p-6 transition-all hover:-translate-y-1 hover:border-[#3A3630]"
                  >
                    <h3 className="font-display text-lg font-medium tracking-tight transition-colors group-hover:text-[#c45d3e]">
                      {item.label}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-[#8A857C]">
                      {item.description}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-[#c45d3e]">
                      Read page
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────── */}
      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_22rem]">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c45d3e]">
              FAQ
            </p>
            <h2 className="font-display text-3xl font-medium tracking-tight">
              Questions teams ask before launching anonymous feedback
            </h2>
            <p className="max-w-xl text-sm leading-7 text-[#8A857C]">
              The product itself is private behind login, so the public site
              needs to explain the model clearly for both humans and search
              systems. These are the common questions that define fit.
            </p>
          </div>
          <div className="divide-y divide-[#2A2722]">
            {homeFaqs.map((faq) => (
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
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────── */}
      <section className="px-6 pb-16">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl bg-[#c45d3e] p-8 text-white shadow-xl shadow-[#c45d3e]/10 sm:p-12">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-white/60">
            Start here
          </p>
          <h2 className="mt-3 max-w-2xl font-display text-3xl font-medium tracking-tight sm:text-4xl">
            Build a feedback channel employees will actually trust enough to use.
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-7 text-white/80">
            Start with Voxr when your team needs anonymous internal feedback that
            is private, discussion-ready, and easier to turn into action.
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
              href="/solutions/anonymous-feedback-software"
              className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-6 py-3 text-sm font-medium text-white transition-colors hover:border-white/60"
            >
              Explore solution pages
            </Link>
          </div>
        </div>
      </section>

      <JsonLd
        data={[
          organizationSchema(),
          websiteSchema(),
          webApplicationSchema(),
          faqSchema(homeFaqs),
        ]}
      />
    </main>
  );
}
