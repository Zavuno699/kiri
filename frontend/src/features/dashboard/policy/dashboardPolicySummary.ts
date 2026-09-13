import {
  getDashboardPolicyContext,
} from "../../../application/policyDecision/adapters/dashboardPolicyAdapter";

export function getDashboardPolicySummary() {
  return getDashboardPolicyContext();
}
