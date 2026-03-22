export const BILLABLE_PLAN_KEYS = ["pro", "enterprise"] as const;

export type BillablePlanKey = (typeof BILLABLE_PLAN_KEYS)[number];
export type PlanKey = BillablePlanKey | "free";
export type WorkspaceLimitMetric = "members" | "feedbackItems" | "forms";

type PlanConfig = {
  key: PlanKey;
  limits: Record<WorkspaceLimitMetric, number>;
};

export const PLAN_CONFIG: Record<PlanKey, PlanConfig> = {
  free: {
    key: "free",
    limits: {
      members: 2,
      feedbackItems: 10,
      forms: 2,
    },
  },
  pro: {
    key: "pro",
    limits: {
      members: 10,
      feedbackItems: 100,
      forms: 20,
    },
  },
  enterprise: {
    key: "enterprise",
    limits: {
      members: 20,
      feedbackItems: 500,
      forms: 50,
    },
  },
};

export const ENTITLED_SUBSCRIPTION_STATUSES = [
  "active",
  "trialing",
  "past_due",
] as const;

export type EntitledSubscriptionStatus =
  (typeof ENTITLED_SUBSCRIPTION_STATUSES)[number];

export function isBillablePlanKey(value: string): value is BillablePlanKey {
  return BILLABLE_PLAN_KEYS.includes(value as BillablePlanKey);
}
