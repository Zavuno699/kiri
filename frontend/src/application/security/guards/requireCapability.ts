import { evaluateRuntimePolicy } from "../runtime/policy/runtimePolicyEvaluator"

export function requireCapability(capability: string): boolean {
  return evaluateRuntimePolicy(capability).allowed
}
