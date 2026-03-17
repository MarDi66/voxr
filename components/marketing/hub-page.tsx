import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/marketing/breadcrumbs";
import { JsonLd } from "@/components/marketing/json-ld";
import type { RelatedLink } from "@/lib/site-content";

type HubPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  crumbs: Array<{ label: string; href: string }>;
  items: RelatedLink[];
  cta: {
    title: string;
    body: string;
    primaryHref: string;
    primaryLabel: string;
    secondaryHref?: string;
    secondaryLabel?: string;
  };
  schema: Array<Record<string, unknown>>;
};

export function HubPage({
  eyebrow,
  title,
  description,
  crumbs,
  items,
  cta,
  schema,
}: HubPageProps) {
  return (
    <main className="mx-auto max-w-5xl px-6 py-12 sm:py-16">
      <div className="space-y-6">
        <Breadcrumbs items={crumbs} />
        <section className="space-y-5">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c45d3e]">
            {eyebrow}
          </p>
          <h1 className="max-w-3xl font-display text-4xl font-medium tracking-tight sm:text-5xl">
            {title}
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-[#8A857C]">
            {description}
          </p>
        </section>
      </div>

      <div className="mt-3 h-px bg-linear-to-r from-[#c45d3e]/40 via-[#2A2722] to-transparent" />

      <section className="mt-12 grid gap-5 lg:grid-cols-2">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group rounded-2xl border border-[#2A2722] bg-[#171613] p-7 transition-all hover:-translate-y-1 hover:border-[#3A3630]"
          >
            <h2 className="font-display text-xl font-medium tracking-tight transition-colors group-hover:text-[#c45d3e]">
              {item.label}
            </h2>
            <p className="mt-3 text-sm leading-7 text-[#8A857C]">
              {item.description}
            </p>
            <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[#c45d3e]">
              Open page
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        ))}
      </section>

      <section className="mt-16 overflow-hidden rounded-2xl bg-[#c45d3e] p-8 text-white shadow-xl shadow-[#c45d3e]/10 sm:p-10">
        <h2 className="font-display text-3xl font-medium tracking-tight">
          {cta.title}
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-white/80">
          {cta.body}
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href={cta.primaryHref}
            className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-[#c45d3e] transition-all hover:-translate-y-px hover:shadow-md"
          >
            {cta.primaryLabel}
            <ArrowRight className="h-4 w-4" />
          </Link>
          {cta.secondaryHref && cta.secondaryLabel ? (
            <Link
              href={cta.secondaryHref}
              className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-6 py-3 text-sm font-medium text-white transition-colors hover:border-white/60"
            >
              {cta.secondaryLabel}
            </Link>
          ) : null}
        </div>
      </section>

      <JsonLd data={schema} />
    </main>
  );
}
