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
      {
        href: "/solutions",
        label: "Solutions hub",
      },
      {
        href: "/solutions/employee-feedback-platform",
        label: "Employee feedback platform",
      },
      {
        href: "/solutions/employee-suggestion-box-software",
        label: "Suggestion box software",
      },
    ],
  },
  {
    title: "Learn",
    links: [
      {
        href: "/guides",
        label: "Guides hub",
      },
      {
        href: "/resources",
        label: "Resources hub",
      },
      {
        href: "/glossary",
        label: "Glossary hub",
      },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div className="space-y-4">
          <p className="text-lg font-semibold">Voxr</p>
          <p className="max-w-md text-sm leading-6 text-muted-foreground">
            Anonymous internal feedback software for modern teams that want
            honest input, stronger trust, and a lightweight way to turn feedback
            into action.
          </p>
          <Link
            href="/auth"
            className="text-sm font-medium text-foreground underline decoration-white/20 underline-offset-4"
          >
            Create a workspace
          </Link>
        </div>
        {footerGroups.map((group) => (
          <div key={group.title} className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              {group.title}
            </p>
            <ul className="space-y-2 text-sm">
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground transition-colors hover:text-foreground"
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
