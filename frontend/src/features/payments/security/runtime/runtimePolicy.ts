import { evaluateRuntimePolicy } from "../../../../application/security/runtime/policy/runtimePolicyEvaluator";

export function evaluatePaymentsReadPolicy() {
  return evaluateRuntimePolicy("payments.read");
}

export function evaluatePaymentsWritePolicy() {
  return evaluateRuntimePolicy("payments.write", {
    mutating: true,
  });
}

export function evaluatePaymentsCommandPolicy() {
  return evaluateRuntimePolicy("payments.write", {
    mutating: true,
    dangerous: false,
  });
}
