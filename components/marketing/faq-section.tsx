import { FAQItem } from "@/lib/site-content";
import { Plus } from "lucide-react";

export function FaqSection({ items }: { items: FAQItem[] }) {
  return (
    <section aria-labelledby="faq-heading" className="space-y-8">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c45d3e]">
          FAQ
        </p>
        <h2
          id="faq-heading"
          className="font-display text-3xl font-medium tracking-tight"
        >
          Common questions
        </h2>
      </div>
      <div className="divide-y divide-[#2A2722]">
        {items.map((item) => (
          <details key={item.question} className="group py-5 first:pt-0">
            <summary className="flex cursor-pointer items-center justify-between gap-4 text-lg font-medium text-[#EAE6DF] transition-colors hover:text-[#c45d3e]">
              {item.question}
              <Plus className="h-5 w-5 shrink-0 text-[#5C5850] transition-transform duration-200 group-open:rotate-45" />
            </summary>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-[#8A857C]">
              {item.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
