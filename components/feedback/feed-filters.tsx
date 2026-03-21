"use client";

import { useSearchParams } from "next/navigation";
import { useRouter } from "@/lib/i18n/navigation";
import { useCallback, useRef, useState } from "react";
import { useTranslations } from "next-intl";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

export function FeedFilters({ slug }: { slug: string }) {
  const t = useTranslations("feedback");
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const updateFilter = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value && value !== "all") {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      router.push(`/w/${slug}?${params.toString()}`);
    },
    [router, searchParams, slug]
  );

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <Tabs
        value={searchParams.get("sort") || "newest"}
        onValueChange={(v) => updateFilter("sort", v)}
      >
        <TabsList>
          <TabsTrigger value="newest">{t("sortNewest")}</TabsTrigger>
          <TabsTrigger value="top">{t("sortTop")}</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="flex gap-2">
        <Select
          value={searchParams.get("category") || "all"}
          onValueChange={(v) => updateFilter("category", v ?? "all")}
        >
          <SelectTrigger className="w-35">
            <SelectValue placeholder={t("categoryLabel")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t("filterAll")}</SelectItem>
            <SelectItem value="idea">{t("categoryIdea")}</SelectItem>
            <SelectItem value="concern">{t("categoryConcern")}</SelectItem>
            <SelectItem value="praise">{t("categoryPraise")}</SelectItem>
            <SelectItem value="question">{t("categoryQuestion")}</SelectItem>
          </SelectContent>
        </Select>

        <Input
          placeholder={t("searchPlaceholder")}
          value={search}
          className="w-50"
          onChange={(e) => {
            const value = e.target.value;
            setSearch(value);
            if (debounceRef.current) clearTimeout(debounceRef.current);
            debounceRef.current = setTimeout(() => {
              updateFilter("search", value);
            }, 300);
          }}
        />
      </div>
    </div>
  );
}
