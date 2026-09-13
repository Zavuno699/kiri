import { evaluateRuntimePolicy } from "../../../../application/security/runtime/policy/runtimePolicyEvaluator";

export function evaluateDashboardReadPolicy() {
  return evaluateRuntimePolicy("dashboard.read");
}

export function evaluateDashboardWritePolicy() {
  return evaluateRuntimePolicy("dashboard.read", {
    mutating: true,
  });
}

export function evaluateDashboardCommandPolicy() {
  return evaluateRuntimePolicy("dashboard.read", {
    mutating: true,
    dangerous: false,
  });
}
