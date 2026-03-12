"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

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
  const router = useRouter();
  const searchParams = useSearchParams();

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
          <TabsTrigger value="newest">Newest</TabsTrigger>
          <TabsTrigger value="top">Top</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="flex gap-2">
        <Select
          value={searchParams.get("category") || "all"}
          onValueChange={(v) => updateFilter("category", v ?? "all")}
        >
          <SelectTrigger className="w-35">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="idea">Idea</SelectItem>
            <SelectItem value="concern">Concern</SelectItem>
            <SelectItem value="praise">Praise</SelectItem>
            <SelectItem value="question">Question</SelectItem>
          </SelectContent>
        </Select>

        <Input
          placeholder="Search..."
          defaultValue={searchParams.get("search") || ""}
          className="w-50"
          onChange={(e) => {
            // Debounce search
            const value = e.target.value;
            const timeout = setTimeout(() => {
              updateFilter("search", value);
            }, 300);
            return () => clearTimeout(timeout);
          }}
        />
      </div>
    </div>
  );
}
