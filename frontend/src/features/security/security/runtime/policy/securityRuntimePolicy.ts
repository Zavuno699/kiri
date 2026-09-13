import { evaluateRuntimePolicy } from "../../../../../application/security/runtime/policy/runtimePolicyEvaluator"

export function evaluateSecurityDomainReadPolicy() {
  return evaluateRuntimePolicy("security.read")
}

export function evaluateSecurityAdminPolicy() {
  return evaluateRuntimePolicy("security.admin", {
    mutating: true,
  })
}
