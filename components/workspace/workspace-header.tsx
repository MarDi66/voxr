"use client";

import { Link } from "@/lib/i18n/navigation";
import { useRouter } from "@/lib/i18n/navigation";
import { toast } from "sonner";
import { BarChart3, LogOut, Plus, Settings, ChevronDown, Building2, ClipboardList, Globe, EllipsisVertical } from "lucide-react";

import { useLocale, useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { createClient } from "@/lib/supabase/client";
import { locales, localeNames, type Locale } from "@/lib/i18n/config";
import VoxrLogo from "../common/logo";

type Workspace = {
  id: string;
  name: string;
  slug: string;
  role: string;
};

export function WorkspaceHeader({
  workspace,
  workspaces,
  isOwner = false,
}: {
  workspace: { id: string; name: string; slug: string };
  workspaces: Workspace[];
  isOwner?: boolean;
}) {
  const router = useRouter();
  const locale = useLocale() as Locale;
  const t = useTranslations("workspace");
  const tl = useTranslations("localeSwitcher");

  function handleLocaleSwitch(targetLocale: Locale) {
    if (targetLocale === locale) return;
    const pathname = window.location.pathname;
    const segments = pathname.split("/").filter(Boolean);
    // Non-marketing path — just swap locale prefix
    const pathSegments = segments.slice(1);
    const url = pathSegments.length === 0
      ? `/${targetLocale}`
      : `/${targetLocale}/${pathSegments.join("/")}`;
    window.location.assign(url);
  }

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    toast.success(t("signedOut"));
    router.push("/auth");
    router.refresh();
  }

  return (
    <header className="border-b">
      <div className="mx-auto flex h-14 max-w-4xl items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Link href={`/w/${workspace.slug}`} className="text-lg font-bold flex gap-2">
            <VoxrLogo className="w-8 shrink-0" />
            <span className="hidden sm:inline">Voxr</span>
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger render={<Button variant="outline" size="sm" />}>
              <span className="truncate max-w-36 hidden sm:inline">{workspace.name}</span>
              <Building2 className="h-4 w-4 sm:hidden" />         
              <ChevronDown className="ml-1 h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-fit">
              <DropdownMenuGroup>
                <DropdownMenuLabel>{t("workspaces")}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {workspaces.map((ws) => (
                  <DropdownMenuItem key={ws.id} onClick={() => router.push(`/w/${ws.slug}`)}>
                    {ws.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.push("/onboarding?manager=true")}>
                {t("createOrJoin")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-center gap-2">
          <Link href={`/w/${workspace.slug}/new`}>
            <Button size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">{t("newFeedback")}</span>
            </Button>
          </Link>

          <TooltipProvider>
            {isOwner && (
              <Tooltip>
                <TooltipTrigger render={
                  <Link href={`/w/${workspace.slug}/forms/new`}>
                    <Button size="sm" variant="ghost" className="gap-2">
                      <ClipboardList className="h-4 w-4" />
                    </Button>
                  </Link>
                } />
                <TooltipContent>{t("newForm")}</TooltipContent>
              </Tooltip>
            )}

            {isOwner && (
              <Tooltip>
                <TooltipTrigger render={
                  <Link href={`/w/${workspace.slug}/analytics`}>
                    <Button variant="ghost" size="sm">
                      <BarChart3 className="h-4 w-4" />
                    </Button>
                  </Link>
                } />
                <TooltipContent>{t("analytics")}</TooltipContent>
              </Tooltip>
            )}

            <DropdownMenu>
              <DropdownMenuTrigger render={<Button variant="ghost" size="sm" />}>
                <EllipsisVertical className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-fit">
                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={() => router.push(`/w/${workspace.slug}/settings`)}>
                    <Settings className="h-4 w-4" />
                    {t("settings")}
                  </DropdownMenuItem>
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                      <Globe className="h-4 w-4" />
                      {tl("label")}
                    </DropdownMenuSubTrigger>
                    <DropdownMenuSubContent>
                      {locales.map((loc) => (
                        <DropdownMenuItem
                          key={loc}
                          onClick={() => handleLocaleSwitch(loc)}
                          className={loc === locale ? "font-medium" : ""}
                        >
                          {localeNames[loc]}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuSubContent>
                  </DropdownMenuSub>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut} variant="destructive">
                  <LogOut className="h-4 w-4" />
                  {t("signOut")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </TooltipProvider>
        </div>
      </div>
    </header>
  );
}
