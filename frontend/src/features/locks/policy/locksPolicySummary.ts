import {
  getLocksPolicyContext,
} from "../../../application/policyDecision/adapters/locksPolicyAdapter";

export function getLocksPolicySummary() {
  return getLocksPolicyContext();
}
