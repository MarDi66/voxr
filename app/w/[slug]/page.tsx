import Link from "next/link";
import { Plus } from "lucide-react";

import { getWorkspaceBySlug, getFeed, checkUserRole } from "@/lib/supabase/queries";
import { FeedItemCard } from "@/components/feedback/feed-item-card";
import { FeedFilters } from "@/components/feedback/feed-filters";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default async function WorkspaceFeedPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ category?: string; search?: string; sort?: string }>;
}) {
  const { slug } = await params;
  const resolvedSearch = await searchParams;

  const workspace = await getWorkspaceBySlug(slug);
  if (!workspace) return null;

  const [items, role] = await Promise.all([
    getFeed(workspace.id, {
      category: resolvedSearch.category,
      search: resolvedSearch.search,
      sort: (resolvedSearch.sort as "newest" | "top") || "newest",
    }),
    checkUserRole(workspace.id),
  ]);

  const isOwner = role === "owner";

  return (
    <div className="space-y-6">
      <FeedFilters slug={slug} />
      <Separator />
      {items.length === 0 ? (
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
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <FeedItemCard key={item.id} item={item} slug={slug} isOwner={isOwner} />
          ))}
        </div>
      )}
    </div>
  );
}
