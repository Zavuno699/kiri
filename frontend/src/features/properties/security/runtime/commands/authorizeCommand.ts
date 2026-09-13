import { evaluateRuntimePolicy } from "../../../../../application/security/runtime/policy/runtimePolicyEvaluator";

export function authorizePropertiesRuntimeCommand(): boolean {
  return evaluateRuntimePolicy("properties.write", {
    mutating: true,
    dangerous: false,
  }).allowed;
}
