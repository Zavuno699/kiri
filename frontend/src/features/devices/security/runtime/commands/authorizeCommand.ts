import { evaluateRuntimePolicy } from "../../../../../application/security/runtime/policy/runtimePolicyEvaluator";

export function authorizeDevicesRuntimeCommand(): boolean {
  return evaluateRuntimePolicy("devices.command", {
    mutating: true,
    dangerous: true,
  }).allowed;
}
