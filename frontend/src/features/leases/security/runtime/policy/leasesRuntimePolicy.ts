import { evaluateRuntimePolicy } from "../../../../../application/security/runtime/policy/runtimePolicyEvaluator"

export function evaluateLeasesReadPolicy() {
  return evaluateRuntimePolicy("leases.read")
}

export function evaluateLeasesWritePolicy() {
  return evaluateRuntimePolicy("leases.write", {
    mutating: true,
  })
}
