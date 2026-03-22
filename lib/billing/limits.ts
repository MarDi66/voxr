import { ACTION_ERROR_CODES } from "@/lib/action-errors";
import { getWorkspaceBillingSummary } from "./queries";
import type { WorkspaceLimitMetric } from "./plans";

const METRIC_ERROR_CODES: Record<WorkspaceLimitMetric, string> = {
  members: ACTION_ERROR_CODES.billingMemberLimitReached,
  feedbackItems: ACTION_ERROR_CODES.billingFeedbackLimitReached,
  forms: ACTION_ERROR_CODES.billingFormsLimitReached,
};

export async function getWorkspaceLimitState(workspaceId: string) {
  return getWorkspaceBillingSummary(workspaceId);
}

export async function getWorkspaceLimitError(
  workspaceId: string,
  metric: WorkspaceLimitMetric,
  increment = 1
) {
  const summary = await getWorkspaceBillingSummary(workspaceId);
  const nextValue = summary.usage[metric] + increment;
  const limit = summary.limits[metric];

  if (nextValue > limit) {
    return METRIC_ERROR_CODES[metric];
  }

  return null;
}
