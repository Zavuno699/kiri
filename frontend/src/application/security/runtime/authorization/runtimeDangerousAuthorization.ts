import { evaluateRuntimePolicy } from "../policy/runtimePolicyEvaluator"

export function authorizeDangerousOperation(
  capability: string,
): boolean {
  return evaluateRuntimePolicy(capability, {
    mutating: true,
    dangerous: true,
  }).allowed
}
