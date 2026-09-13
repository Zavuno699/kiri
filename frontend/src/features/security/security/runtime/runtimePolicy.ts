import { evaluateRuntimePolicy } from "../../../../application/security/runtime/policy/runtimePolicyEvaluator";

export function evaluateSecurityReadPolicy() {
  return evaluateRuntimePolicy("security.read");
}

export function evaluateSecurityWritePolicy() {
  return evaluateRuntimePolicy("security.admin", {
    mutating: true,
  });
}

export function evaluateSecurityCommandPolicy() {
  return evaluateRuntimePolicy("security.admin", {
    mutating: true,
    dangerous: false,
  });
}
