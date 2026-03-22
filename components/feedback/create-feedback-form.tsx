"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "@/lib/i18n/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";

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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createItemSchema, type CreateItemInput } from "@/lib/validators/feedback";
import { createItem } from "@/actions/feedback";
import { getActionErrorMessage } from "@/lib/action-error-message";

export function CreateFeedbackForm({
  workspaceId,
  slug,
}: {
  workspaceId: string;
  slug: string;
}) {
  const t = useTranslations("feedback");
  const tc = useTranslations("common");
  const te = useTranslations("billingErrors");
  const router = useRouter();
  const form = useForm<CreateItemInput>({
    resolver: zodResolver(createItemSchema),
    defaultValues: {
      workspaceId,
      title: "",
      body: "",
      category: "idea",
    },
  });

  async function onSubmit(data: CreateItemInput) {
    const result = await createItem(data);
    if (result.error) {
      toast.error(getActionErrorMessage(result.error, te));
      return;
    }
    toast.success(t("feedbackPosted"));
    router.push(`/w/${slug}/i/${result.itemId}`);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("shareTitle")}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("titleLabel")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("titlePlaceholder")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="body"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("detailsLabel")}</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={t("detailsPlaceholder")}
                      className="min-h-30"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("categoryLabel")}</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={t("categoryPlaceholder")} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="idea">{t("categoryIdea")}</SelectItem>
                      <SelectItem value="concern">{t("categoryConcern")}</SelectItem>
                      <SelectItem value="praise">{t("categoryPraise")}</SelectItem>
                      <SelectItem value="question">{t("categoryQuestion")}</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
              >
                {tc("cancel")}
              </Button>
              <Button
                type="submit"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {t("postFeedback")}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
