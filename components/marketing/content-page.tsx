import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/marketing/breadcrumbs";
import { FaqSection } from "@/components/marketing/faq-section";
import { JsonLd } from "@/components/marketing/json-ld";
import type { ContentPageRecord } from "@/lib/site-content";

export function ContentPage({
  page,
  schema,
}: {
  page: ContentPageRecord;
  schema: Array<Record<string, unknown>>;
}) {
  return (
    <main>
      <div className="mx-auto max-w-5xl px-6 py-12 sm:py-16">
        <div className="space-y-6">
          <Breadcrumbs items={page.breadcrumbs} />
          <section className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end">
            <div className="space-y-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c45d3e]">
                {page.eyebrow}
              </p>
              <div className="space-y-4">
                <h1 className="max-w-3xl font-display text-4xl font-medium tracking-tight sm:text-5xl">
                  {page.title}
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-[#8A857C]">
                  {page.intro}
                </p>
              </div>
              <ul className="grid gap-3 sm:grid-cols-2">
                {page.summaryPoints.map((point) => (
                  <li
                    key={point}
                    className="rounded-xl border border-[#2A2722] bg-[#171613] px-4 py-3 text-sm text-[#8A857C]"
                  >
                    {point}
                  </li>
                ))}
              </ul>
            </div>
            <aside className="rounded-2xl border border-[#c45d3e]/20 bg-[#c45d3e]/10 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#c45d3e]">
                Quick answer
              </p>
              <p className="mt-4 text-sm leading-7 text-[#B0ACA4]">
                {page.definition}
              </p>
            </aside>
          </section>
        </div>

        <div className="mt-4 h-px bg-gradient-to-r from-[#c45d3e]/40 via-[#2A2722] to-transparent" />

        <div className="mt-14 grid gap-14 lg:grid-cols-[minmax(0,1fr)_18rem]">
          <article className="space-y-14">
            {page.comparison ? (
              <section className="space-y-5">
                <div className="space-y-2">
                  <h2 className="font-display text-3xl font-medium tracking-tight">
                    {page.comparison.title}
                  </h2>
                  {page.comparison.description ? (
                    <p className="max-w-3xl text-base leading-7 text-[#8A857C]">
                      {page.comparison.description}
                    </p>
                  ) : null}
                </div>
                <div className="overflow-hidden rounded-2xl border border-[#2A2722]">
                  <table className="min-w-full border-collapse text-left text-sm">
                    <caption className="sr-only">
                      {page.comparison.title}
                    </caption>
                    <thead className="bg-[#171613]">
                      <tr>
                        {page.comparison.headers.map((header) => (
                          <th
                            key={header}
                            className="px-5 py-4 font-medium text-[#EAE6DF]"
                          >
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {page.comparison.rows.map((row) => (
                        <tr
                          key={row[0]}
                          className="border-t border-[#2A2722] align-top"
                        >
                          {row.map((cell) => (
                            <td
                              key={cell}
                              className="bg-[#121110] px-5 py-4 leading-7 text-[#8A857C]"
                            >
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            ) : null}

            {page.sections.map((section) => (
              <section key={section.title} className="space-y-5">
                <div className="space-y-3">
                  <h2 className="font-display text-3xl font-medium tracking-tight">
                    {section.title}
                  </h2>
                  {section.paragraphs.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="max-w-3xl text-base leading-7 text-[#8A857C]"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
                {section.bullets ? (
                  <ul className="grid gap-3 sm:grid-cols-2">
                    {section.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="rounded-xl border border-[#2A2722] bg-[#171613] px-4 py-3 text-sm leading-7 text-[#8A857C]"
                      >
                        {bullet}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}

            <FaqSection items={page.faqs} />

            <section className="overflow-hidden rounded-2xl bg-[#c45d3e] p-8 text-white shadow-xl shadow-[#c45d3e]/10">
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-white/60">
                  Next step
                </p>
                <h2 className="font-display text-3xl font-medium tracking-tight">
                  {page.cta.title}
                </h2>
                <p className="max-w-2xl text-sm leading-7 text-white/80">
                  {page.cta.body}
                </p>
              </div>
              <div className="mt-6 flex flex-wrap gap-4">
                <Link
                  href={page.cta.primary.href}
                  className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-[#c45d3e] transition-all hover:-translate-y-px hover:shadow-md"
                >
                  {page.cta.primary.label}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                {page.cta.secondary ? (
                  <Link
                    href={page.cta.secondary.href}
                    className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-5 py-3 text-sm font-medium text-white transition-colors hover:border-white/60"
                  >
                    {page.cta.secondary.label}
                  </Link>
                ) : null}
              </div>
            </section>
          </article>

          <aside className="space-y-4 lg:pt-2">
            <div className="rounded-2xl border border-[#2A2722] bg-[#171613] p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#c45d3e]">
                Related pages
              </p>
              <ul className="mt-5 space-y-5">
                {page.relatedLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="group block space-y-1">
                      <span className="text-sm font-medium text-[#EAE6DF] transition-colors group-hover:text-[#c45d3e]">
                        {link.label}
                      </span>
                      <span className="block text-sm leading-6 text-[#8A857C]">
                        {link.description}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
      <JsonLd data={schema} />
    </main>
  );
}
