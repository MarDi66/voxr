import { ACTION_ERROR_CODES } from "./action-errors";

type Translator = (key: string) => string;

export function getActionErrorMessage(error: string, t: Translator) {
  switch (error) {
    case ACTION_ERROR_CODES.billingMemberLimitReached:
      return t("memberLimitReached");
    case ACTION_ERROR_CODES.billingFeedbackLimitReached:
      return t("feedbackItemLimitReached");
    case ACTION_ERROR_CODES.billingFormsLimitReached:
      return t("formsLimitReached");
    case ACTION_ERROR_CODES.billingSubscriptionNotFound:
      return t("subscriptionNotFound");
    case ACTION_ERROR_CODES.billingSubscriptionAlreadyAttached:
      return t("subscriptionAlreadyAttached");
    case ACTION_ERROR_CODES.billingWorkspaceOwnerRequired:
      return t("workspaceOwnerRequired");
    case ACTION_ERROR_CODES.billingWorkspaceAlreadyPaid:
      return t("workspaceAlreadyPaid");
    case ACTION_ERROR_CODES.billingPortalUnavailable:
      return t("portalUnavailable");
    default:
      return error;
  }
}
