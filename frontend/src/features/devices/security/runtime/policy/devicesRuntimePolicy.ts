import { evaluateRuntimePolicy } from "../../../../../application/security/runtime/policy/runtimePolicyEvaluator"

export function evaluateDevicesReadPolicy() {
  return evaluateRuntimePolicy("devices.read")
}

export function evaluateDevicesWritePolicy() {
  return evaluateRuntimePolicy("devices.command", {
    mutating: true,
  })
}
