import {
  getLeasesPolicyContext,
} from "../../../application/policyDecision/adapters/leasesPolicyAdapter";

export function getLeasesPolicySummary() {
  return getLeasesPolicyContext();
}
