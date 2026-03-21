"use client";

import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { updateWorkspaceSchema, type UpdateWorkspaceInput } from "@/lib/validators/workspaces";
import { updateWorkspace, deleteWorkspace } from "@/actions/workspaces";
import { useRouter } from "@/lib/i18n/navigation";

type Workspace = {
  id: string;
  name: string;
  slug: string;
};

export function WorkspaceSettingsTab({
  workspace,
  isOwner,
  isAdmin,
}: {
  workspace: Workspace;
  isOwner: boolean;
  isAdmin?: boolean;
}) {
  const t = useTranslations("workspace");
  const tc = useTranslations("common");
  const canEdit = isOwner || isAdmin;
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
    toast.success(t("workspaceUpdated"));
    router.refresh();
  }

  async function handleDelete() {
    const result = await deleteWorkspace(workspace.id);
    if (result.error) {
      toast.error(result.error);
      return;
    }
    toast.success(t("workspaceDeleted"));
    router.push("/onboarding");
  }

  if (!canEdit) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{t("general")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              {t("nameLabel")}
            </p>
            <p className="text-lg">{workspace.name}</p>
          </div>
          <div className="text-sm text-muted-foreground">
            {t("slugLabel")} <code className="rounded bg-muted px-1">{workspace.slug}</code>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{t("general")}</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("nameLabel")}</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="text-sm text-muted-foreground">
                {t("slugLabel")} <code className="rounded bg-muted px-1">{workspace.slug}</code>
              </div>
              <Button
                type="submit"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {t("save")}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {isOwner && (
      <Card className="border-destructive">
        <CardHeader>
          <CardTitle className="text-destructive">{t("dangerZone")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">{t("deleteWorkspace")}</p>
              <p className="text-sm text-muted-foreground">
                {t("deleteWarning")}
              </p>
            </div>
            <AlertDialog>
              <AlertDialogTrigger render={<Button variant="destructive" size="sm" />}>
                  {t("delete")}
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>{t("deleteConfirmTitle")}</AlertDialogTitle>
                  <AlertDialogDescription>
                    {t("deleteConfirmDescription", { name: workspace.name })}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>{tc("cancel")}</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete}>
                    {t("deleteConfirmButton")}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardContent>
      </Card>
      )}
    </div>
  );
}
