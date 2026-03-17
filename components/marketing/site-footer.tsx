import Link from "next/link";

const footerGroups = [
  {
    title: "Platform",
    links: [
      { href: "/product", label: "Product" },
      { href: "/features", label: "Features" },
      { href: "/security", label: "Security & privacy" },
    ],
  },
  {
    title: "Use cases",
    links: [
      { href: "/solutions", label: "Solutions hub" },
      { href: "/solutions/employee-feedback-platform", label: "Employee feedback platform" },
      { href: "/solutions/employee-suggestion-box-software", label: "Suggestion box software" },
    ],
  },
  {
    title: "Learn",
    links: [
      { href: "/guides", label: "Guides hub" },
      { href: "/resources", label: "Resources hub" },
      { href: "/glossary", label: "Glossary hub" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-[#2A2722]">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 lg:grid-cols-[1.5fr_repeat(3,1fr)]">
        <div className="space-y-5">
          <p className="font-display text-xl font-medium tracking-tight text-[#EAE6DF]">
            Voxr
          </p>
          <p className="max-w-sm text-sm leading-relaxed text-[#8A857C]">
            Anonymous internal feedback software for modern teams that want
            honest input, stronger trust, and a lightweight way to turn feedback
            into action.
          </p>
          <Link
            href="/auth"
            className="inline-block text-sm font-medium text-[#c45d3e] underline decoration-[#c45d3e]/30 underline-offset-4 transition-colors hover:decoration-[#c45d3e]"
          >
            Create a workspace
          </Link>
        </div>

        {footerGroups.map((group) => (
          <div key={group.title} className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#5C5850]">
              {group.title}
            </p>
            <ul className="space-y-3 text-sm">
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[#8A857C] transition-colors hover:text-[#EAE6DF]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  );
}
