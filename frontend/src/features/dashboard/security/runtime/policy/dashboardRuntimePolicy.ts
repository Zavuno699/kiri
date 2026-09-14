import { evaluateRuntimePolicy } from "../../../../../application/security/runtime/policy/runtimePolicyEvaluator"

export function evaluateDashboardReadPolicy() {
  return evaluateRuntimePolicy("dashboard.read")
}

export function evaluateDashboardWritePolicy() {
  return evaluateRuntimePolicy("dashboard.write", {
    mutating: true,
  })
}
