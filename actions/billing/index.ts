"use server";

import { ACTION_ERROR_CODES } from "@/lib/action-errors";
import { syncCheckoutSession } from "@/lib/stripe";
import { createClient } from "@/lib/supabase/server";
import { createWorkspace } from "@/actions/workspaces";

async function getClaimableSubscription(input: {
  sessionId?: string;
  subscriptionId?: string;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Not authenticated" };
  }

  if (input.sessionId) {
    await syncCheckoutSession(input.sessionId);
  }

  const subscriptionQuery = supabase
    .from("billing_subscriptions")
    .select("*");

  const { data: subscription } = input.subscriptionId
    ? await subscriptionQuery.eq("id", input.subscriptionId).maybeSingle()
    : await subscriptionQuery
        .eq("stripe_checkout_session_id", input.sessionId ?? "")
        .maybeSingle();

  if (!subscription || subscription.owner_user_id !== user.id) {
    return { error: ACTION_ERROR_CODES.billingSubscriptionNotFound };
  }

  return { supabase, subscription, user };
}

export async function claimSubscriptionToWorkspace(input: {
  sessionId?: string;
  subscriptionId?: string;
  workspaceId: string;
}) {
  const claimable = await getClaimableSubscription(input);
  if ("error" in claimable) {
    return { error: claimable.error };
  }

  const { supabase, subscription } = claimable;
  const currentUserId = claimable.user.id;

  if (
    subscription.workspace_id &&
    subscription.workspace_id !== input.workspaceId
  ) {
    return { error: ACTION_ERROR_CODES.billingSubscriptionAlreadyAttached };
  }

  const [{ data: membership }, { data: existingWorkspaceSubscription }] =
    await Promise.all([
      supabase
        .from("workspace_members")
        .select("workspace_id")
        .eq("workspace_id", input.workspaceId)
        .eq("user_id", currentUserId)
        .eq("role", "owner")
        .eq("status", "active")
        .maybeSingle(),
      supabase
        .from("billing_subscriptions")
        .select("id")
        .eq("workspace_id", input.workspaceId)
        .in("status", ["active", "trialing", "past_due"])
        .neq("id", subscription.id)
        .maybeSingle(),
    ]);

  if (!membership) {
    return { error: ACTION_ERROR_CODES.billingWorkspaceOwnerRequired };
  }

  if (existingWorkspaceSubscription) {
    return { error: ACTION_ERROR_CODES.billingWorkspaceAlreadyPaid };
  }

  const { error } = await supabase
    .from("billing_subscriptions")
    .update({ workspace_id: input.workspaceId })
    .eq("id", subscription.id);

  if (error) {
    return { error: error.message };
  }

  const { data: workspace } = await supabase
    .from("workspaces")
    .select("slug")
    .eq("id", input.workspaceId)
    .maybeSingle();

  return {
    success: true,
    slug: workspace?.slug ?? "",
  };
}

export async function createWorkspaceAndClaimSubscription(input: {
  sessionId?: string;
  subscriptionId?: string;
  name: string;
  slug: string;
}) {
  const workspaceResult = await createWorkspace({
    name: input.name,
    slug: input.slug,
  });

  if (workspaceResult.error || !workspaceResult.workspaceId) {
    return { error: workspaceResult.error ?? "Workspace creation failed" };
  }

  const claimResult = await claimSubscriptionToWorkspace({
    sessionId: input.sessionId,
    subscriptionId: input.subscriptionId,
    workspaceId: workspaceResult.workspaceId,
  });

  if (claimResult.error) {
    return { error: claimResult.error };
  }

  return {
    success: true,
    slug: claimResult.slug,
  };
}
