import { evaluateRuntimePolicy } from "../../../../application/security/runtime/policy/runtimePolicyEvaluator"

export function evaluateSecurityReadAccess() {
  return evaluateRuntimePolicy("security.read")
}

export function evaluateSecurityWriteAccess() {
  return evaluateRuntimePolicy("security.admin", {
    mutating: true,
  })
}
