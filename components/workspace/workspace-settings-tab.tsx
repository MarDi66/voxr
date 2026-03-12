"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { updateWorkspaceSchema, type UpdateWorkspaceInput } from "@/lib/validators/workspaces";
import { updateWorkspace } from "@/actions/workspaces";
import { useRouter } from "next/navigation";

type Workspace = {
  id: string;
  name: string;
  slug: string;
};

export function WorkspaceSettingsTab({ workspace }: { workspace: Workspace }) {
  const router = useRouter();
  const form = useForm<UpdateWorkspaceInput>({
    resolver: zodResolver(updateWorkspaceSchema),
    defaultValues: {
      workspaceId: workspace.id,
      name: workspace.name,
    },
  });

  async function onSubmit(data: UpdateWorkspaceInput) {
    const result = await updateWorkspace(data);
    if (result.error) {
      toast.error(result.error);
      return;
    }
    toast.success("Workspace updated");
    router.refresh();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>General</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Workspace Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="text-sm text-muted-foreground">
              Slug: <code className="rounded bg-muted px-1">{workspace.slug}</code>
            </div>
            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Save
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
