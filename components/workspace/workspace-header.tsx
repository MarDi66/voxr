"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { BarChart3, LogOut, Plus, Settings, ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { createClient } from "@/lib/supabase/client";

type Workspace = {
  id: string;
  name: string;
  slug: string;
  role: string;
};

export function WorkspaceHeader({
  workspace,
  workspaces,
}: {
  workspace: { id: string; name: string; slug: string };
  workspaces: Workspace[];
}) {
  const router = useRouter();

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    toast.success("Signed out");
    router.push("/auth");
    router.refresh();
  }

  return (
    <header className="border-b">
      <div className="mx-auto flex h-14 max-w-4xl items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Link href={`/w/${workspace.slug}`} className="text-lg font-bold">
            Voxr
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger render={<Button variant="outline" size="sm" />}>
              {workspace.name}
              <ChevronDown className="ml-1 h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-fit">
              <DropdownMenuGroup>
                <DropdownMenuLabel>Workspaces</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {workspaces.map((ws) => (
                  <DropdownMenuItem key={ws.id} onClick={() => router.push(`/w/${ws.slug}`)}>
                    {ws.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.push("/onboarding?manager=true")}>
                Create or join workspace
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-center gap-2">
          <Link href={`/w/${workspace.slug}/new`}>
            <Button size="sm">
              <Plus className="mr-1 h-4 w-4" />
              New Feedback
            </Button>
          </Link>

          <Link href={`/w/${workspace.slug}/analytics`}>
            <Button variant="ghost" size="sm">
              <BarChart3 className="h-4 w-4" />
            </Button>
          </Link>

          <Link href={`/w/${workspace.slug}/settings`}>
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
          </Link>

          <Button variant="ghost" size="sm" onClick={handleSignOut}>
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}
