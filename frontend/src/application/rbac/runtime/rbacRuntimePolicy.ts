import { evaluateRuntimePolicy } from "../../security/runtime/policy/runtimePolicyEvaluator"

export interface RBACPolicy {
  allows(capability?: string): boolean
}

export function runtimeRBACPolicy(
  capability?: string,
): RBACPolicy {
  return {
    allows(required = capability) {
      return required
        ? evaluateRuntimePolicy(required).allowed
        : false
    },
  }
}
