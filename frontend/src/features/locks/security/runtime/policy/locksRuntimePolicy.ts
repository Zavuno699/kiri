import { evaluateRuntimePolicy } from "../../../../../application/security/runtime/policy/runtimePolicyEvaluator"

export function evaluateLocksReadPolicy() {
  return evaluateRuntimePolicy("locks.read")
}

export function evaluateLocksWritePolicy() {
  return evaluateRuntimePolicy("locks.command", {
    mutating: true,
  })
}
