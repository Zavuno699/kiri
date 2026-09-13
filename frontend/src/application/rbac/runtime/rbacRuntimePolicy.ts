import { evaluateRuntimePolicy } from "../../security/runtime/policy/runtimePolicyEvaluator"

export interface RBACPolicy {
  allows(capability?: string): boolean
}

export function runtimeRBACPolicy(capability?: string): RBACPolicy {
  return {
    allows(required = capability) {
      if (!required) return false
      return evaluateRuntimePolicy(required).allowed
    },
  }
}
