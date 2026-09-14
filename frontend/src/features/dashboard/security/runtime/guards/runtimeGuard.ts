import { evaluateRuntimePolicy } from "../../../../../application/security/runtime/policy/runtimePolicyEvaluator";

export function dashboardRuntimeReadable(): boolean {
  return evaluateRuntimePolicy("dashboard.read").allowed;
}

export function dashboardRuntimeWritable(): boolean {
  return evaluateRuntimePolicy("dashboard.read", {
    mutating: true,
  }).allowed;
}

export function dashboardRuntimeCommandable(): boolean {
  return evaluateRuntimePolicy("dashboard.read", {
    mutating: true,
    dangerous: false,
  }).allowed;
}
