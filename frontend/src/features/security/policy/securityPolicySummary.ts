import {
  getSecurityPolicyContext,
} from "../../../application/policyDecision/adapters/securityPolicyAdapter";

export function getSecurityPolicySummary() {
  return getSecurityPolicyContext();
}
