import { evaluateRuntimePolicy } from "../../../../../application/security/runtime/policy/runtimePolicyEvaluator";

export function authorizeLeasesRuntimeCommand(): boolean {
  return evaluateRuntimePolicy("leases.write", {
    mutating: true,
    dangerous: false,
  }).allowed;
}
