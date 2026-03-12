"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { joinWorkspaceSchema, type JoinWorkspaceInput } from "@/lib/validators/workspaces";
import { consumeInvite } from "@/actions/workspaces";

export function JoinWorkspaceForm({ defaultToken }: { defaultToken?: string }) {
  const router = useRouter();
  const form = useForm<JoinWorkspaceInput>({
    resolver: zodResolver(joinWorkspaceSchema),
    defaultValues: { inviteToken: defaultToken || "" },
  });

  async function onSubmit(data: JoinWorkspaceInput) {
    const result = await consumeInvite(data);
    if (result.error) {
      toast.error(result.error);
      return;
    }
    toast.success("Joined workspace!");
    router.push(`/w/${result.slug}`);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Join a workspace</CardTitle>
        <CardDescription>
          Enter an invite token to join an existing workspace
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="inviteToken"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Invite Token</FormLabel>
                  <FormControl>
                    <Input placeholder="Paste your invite token" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Join Workspace
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
