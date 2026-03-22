import { createClient } from "@/lib/supabase/server";
import type { PlanKey, WorkspaceLimitMetric } from "./plans";
import {
  ENTITLED_SUBSCRIPTION_STATUSES,
  PLAN_CONFIG,
} from "./plans";

type SupabaseLike = Awaited<ReturnType<typeof createClient>>;

export type BillingSubscriptionRecord = {
  id: string;
  owner_user_id: string;
  workspace_id: string | null;
  stripe_customer_id: string;
  stripe_subscription_id: string;
  stripe_checkout_session_id: string | null;
  plan_key: Exclude<PlanKey, "free">;
  stripe_price_id: string;
  status: string;
  cancel_at_period_end: boolean;
  current_period_start: string | null;
  current_period_end: string | null;
  created_at: string;
  updated_at: string;
};

export type WorkspaceBillingSummary = {
  planKey: PlanKey;
  limits: Record<WorkspaceLimitMetric, number>;
  usage: Record<WorkspaceLimitMetric, number>;
  subscription: BillingSubscriptionRecord | null;
};

function isEntitledStatus(status: string) {
  return ENTITLED_SUBSCRIPTION_STATUSES.includes(
    status as (typeof ENTITLED_SUBSCRIPTION_STATUSES)[number]
  );
}

export async function getWorkspaceBillingSummary(
  workspaceId: string,
  supabase?: SupabaseLike
): Promise<WorkspaceBillingSummary> {
  const client = supabase ?? (await createClient());

  const [{ data: subscription }, usage] = await Promise.all([
    client
      .from("billing_subscriptions")
      .select("*")
      .eq("workspace_id", workspaceId)
      .in("status", [...ENTITLED_SUBSCRIPTION_STATUSES])
      .order("current_period_end", { ascending: false, nullsFirst: false })
      .limit(1)
      .maybeSingle(),
    getWorkspaceUsage(workspaceId, client),
  ]);

  const entitledSubscription =
    subscription &&
    isEntitledStatus(subscription.status) &&
    (!subscription.current_period_end ||
      new Date(subscription.current_period_end) >= new Date())
      ? (subscription as BillingSubscriptionRecord)
      : null;

  const planKey = entitledSubscription?.plan_key ?? "free";

  return {
    planKey,
    limits: PLAN_CONFIG[planKey].limits,
    usage,
    subscription: entitledSubscription,
  };
}

export async function getWorkspaceUsage(
  workspaceId: string,
  supabase?: SupabaseLike
) {
  const client = supabase ?? (await createClient());

  const [
    { count: membersCount },
    { count: feedbackCount },
    { count: formsCount },
  ] = await Promise.all([
    client
      .from("workspace_members")
      .select("user_id", { count: "exact", head: true })
      .eq("workspace_id", workspaceId)
      .eq("status", "active"),
    client
      .from("feedback_items")
      .select("id", { count: "exact", head: true })
      .eq("workspace_id", workspaceId),
    client
      .from("forms")
      .select("id", { count: "exact", head: true })
      .eq("workspace_id", workspaceId),
  ]);

  return {
    members: membersCount ?? 0,
    feedbackItems: feedbackCount ?? 0,
    forms: formsCount ?? 0,
  };
}

export async function getOwnedWorkspaces(supabase?: SupabaseLike) {
  const client = supabase ?? (await createClient());
  const {
    data: { user },
  } = await client.auth.getUser();

  if (!user) {
    return [];
  }

  const { data, error } = await client
    .from("workspace_members")
    .select("workspace_id, workspaces(id, name, slug)")
    .eq("user_id", user.id)
    .eq("role", "owner")
    .eq("status", "active");

  if (error) {
    return [];
  }

  return (data ?? [])
    .map((entry) => {
      const workspaceRecord = entry.workspaces as unknown as
        | { id: string; name: string; slug: string }
        | { id: string; name: string; slug: string }[]
        | null;

      if (Array.isArray(workspaceRecord)) {
        return workspaceRecord[0] ?? null;
      }

      return workspaceRecord;
    })
    .filter((workspace): workspace is { id: string; name: string; slug: string } => !!workspace);
}
