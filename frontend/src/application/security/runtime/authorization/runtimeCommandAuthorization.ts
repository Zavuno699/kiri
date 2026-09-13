import { evaluateRuntimePolicy } from "../policy/runtimePolicyEvaluator"

export function authorizeRuntimeCommand(capability: string): boolean {
  return evaluateRuntimePolicy(capability, { mutating: true }).allowed
}
