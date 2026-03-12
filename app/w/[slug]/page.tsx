import Link from "next/link";
import { Suspense } from "react";
import { Plus } from "lucide-react";

import { getWorkspaceBySlug, getFeed } from "@/lib/supabase/queries";
import { FeedItemCard } from "@/components/feedback/feed-item-card";
import { FeedFilters } from "@/components/feedback/feed-filters";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

function FeedSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <Card key={i}>
          <CardContent className="space-y-3 p-6">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-1/2" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

async function FeedContent({
  slug,
  searchParams,
}: {
  slug: string;
  searchParams: { category?: string; search?: string; sort?: string };
}) {
  const workspace = await getWorkspaceBySlug(slug);
  if (!workspace) return null;

  const items = await getFeed(workspace.id, {
    category: searchParams.category,
    search: searchParams.search,
    sort: (searchParams.sort as "newest" | "top") || "newest",
  });

  if (items.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center gap-4 py-12">
          <p className="text-lg font-medium">No feedback yet</p>
          <p className="text-sm text-muted-foreground">
            Be the first to share your thoughts
          </p>
          <Link href={`/w/${slug}/new`}>
            <Button>
              <Plus className="mr-1 h-4 w-4" />
              Create First Post
            </Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <FeedItemCard key={item.id} item={item} slug={slug} />
      ))}
    </div>
  );
}

export default async function WorkspaceFeedPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ category?: string; search?: string; sort?: string }>;
}) {
  const { slug } = await params;
  const resolvedSearch = await searchParams;

  return (
    <div className="space-y-6">
      <FeedFilters slug={slug} />
      <Separator />
      <Suspense fallback={<FeedSkeleton />}>
        <FeedContent slug={slug} searchParams={resolvedSearch} />
      </Suspense>
    </div>
  );
}
