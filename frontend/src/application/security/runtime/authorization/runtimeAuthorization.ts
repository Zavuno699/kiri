import { evaluateRuntimePolicy } from "../policy/runtimePolicyEvaluator"

export function authorizeRuntime(capability: string): boolean {
  return evaluateRuntimePolicy(capability).allowed
}
