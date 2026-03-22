export const ACTION_ERROR_CODES = {
  billingMemberLimitReached: "BILLING_LIMIT_MEMBERS",
  billingFeedbackLimitReached: "BILLING_LIMIT_FEEDBACK_ITEMS",
  billingFormsLimitReached: "BILLING_LIMIT_FORMS",
  billingSubscriptionNotFound: "BILLING_SUBSCRIPTION_NOT_FOUND",
  billingSubscriptionAlreadyAttached: "BILLING_SUBSCRIPTION_ALREADY_ATTACHED",
  billingWorkspaceOwnerRequired: "BILLING_WORKSPACE_OWNER_REQUIRED",
  billingWorkspaceAlreadyPaid: "BILLING_WORKSPACE_ALREADY_PAID",
  billingPortalUnavailable: "BILLING_PORTAL_UNAVAILABLE",
} as const;

export type ActionErrorCode =
  (typeof ACTION_ERROR_CODES)[keyof typeof ACTION_ERROR_CODES];

export function isActionErrorCode(value: string): value is ActionErrorCode {
  return Object.values(ACTION_ERROR_CODES).includes(value as ActionErrorCode);
}
