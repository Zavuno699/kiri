import { evaluateRuntimePolicy } from "../../../../../application/security/runtime/policy/runtimePolicyEvaluator";

export function authorizeLocksRuntimeCommand(): boolean {
  return evaluateRuntimePolicy("locks.command", {
    mutating: true,
    dangerous: true,
  }).allowed;
}
