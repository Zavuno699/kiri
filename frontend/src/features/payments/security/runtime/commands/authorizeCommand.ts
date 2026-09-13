import { evaluateRuntimePolicy } from "../../../../../application/security/runtime/policy/runtimePolicyEvaluator";

export function authorizePaymentsRuntimeCommand(): boolean {
  return evaluateRuntimePolicy("payments.write", {
    mutating: true,
    dangerous: false,
  }).allowed;
}
