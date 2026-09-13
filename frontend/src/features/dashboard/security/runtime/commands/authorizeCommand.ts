import { evaluateRuntimePolicy } from "../../../../../application/security/runtime/policy/runtimePolicyEvaluator";

export function authorizeDashboardRuntimeCommand(): boolean {
  return evaluateRuntimePolicy("dashboard.read", {
    mutating: true,
    dangerous: false,
  }).allowed;
}
