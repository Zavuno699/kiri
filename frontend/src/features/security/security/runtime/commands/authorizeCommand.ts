import { evaluateRuntimePolicy } from "../../../../../application/security/runtime/policy/runtimePolicyEvaluator";

export function authorizeSecurityRuntimeCommand(): boolean {
  return evaluateRuntimePolicy("security.admin", {
    mutating: true,
    dangerous: false,
  }).allowed;
}
