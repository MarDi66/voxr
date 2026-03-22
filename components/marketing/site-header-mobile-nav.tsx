"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import { ArrowRight, Menu } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LocaleSwitcher } from "@/components/marketing/locale-switcher";

type SiteHeaderMobileNavProps = {
  links: Array<{
    href: string;
    label: string;
  }>;
  isLoggedIn: boolean;
};

export function SiteHeaderMobileNav({ links, isLoggedIn }: SiteHeaderMobileNavProps) {
  const [open, setOpen] = useState(false);
  const t = useTranslations("nav");

  const handleNavigate = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <button
            type="button"
            className="ml-auto flex items-center gap-2 rounded-full border border-[#2A2722] bg-[#161310]/90 px-4 py-2 text-sm font-medium text-[#EAE6DF] shadow-[0_10px_35px_rgba(0,0,0,0.28)] transition-colors hover:border-[#4B433A] hover:bg-[#1D1915] md:hidden"
          />
        }
      >
        <Menu className="h-4 w-4" />
        {t("menu")}
      </DialogTrigger>

      <DialogContent
        showCloseButton={false}
        className="gap-0 rounded-[1.5rem] max-w-none w-[95dvw] border border-[#2A2722] bg-[linear-gradient(180deg,rgba(29,25,21,0.98),rgba(12,11,9,0.98))] p-3 text-[#EAE6DF] ring-0 sm:max-w-none"
      >
        <DialogTitle className="sr-only">{t("mobileMenuTitle")}</DialogTitle>

        <div>
          <div className="px-3 pb-2 pt-1 text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-[#8A857C]">
            {t("navigate")}
          </div>

          <nav aria-label="Mobile primary" className="flex flex-col">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={handleNavigate}
                className="rounded-xl px-3 py-3 text-sm text-[#EAE6DF] transition-colors hover:bg-[#1B1713] hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="mt-2 flex flex-col gap-2 border-t border-[#2A2722] px-2 pb-2 pt-3">
            <div className="flex items-center justify-between px-3 py-2">
              <LocaleSwitcher />
            </div>
            {isLoggedIn ? (
              <Link
                href="/w/onboarding"
                onClick={handleNavigate}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-terracotta px-4 py-3 text-sm font-medium text-white shadow-sm shadow-terracotta/20 transition-all hover:-translate-y-px hover:shadow-md hover:shadow-terracotta/25"
              >
                {t("goToWorkspace")}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            ) : (
              <>
                <Link
                  href="/auth"
                  onClick={handleNavigate}
                  className="rounded-xl px-3 py-3 text-sm text-[#C4BEB5] transition-colors hover:bg-[#1B1713] hover:text-[#EAE6DF]"
                >
                  {t("signIn")}
                </Link>
                <Link
                  href="/auth"
                  onClick={handleNavigate}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-terracotta px-4 py-3 text-sm font-medium text-white shadow-sm shadow-terracotta/20 transition-all hover:-translate-y-px hover:shadow-md hover:shadow-terracotta/25"
                >
                  {t("getStarted")}
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
