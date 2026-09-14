import { evaluateRuntimePolicy } from "../../../../../application/security/runtime/policy/runtimePolicyEvaluator";

export function paymentsRuntimeReadable(): boolean {
  return evaluateRuntimePolicy("payments.read").allowed;
}

export function paymentsRuntimeWritable(): boolean {
  return evaluateRuntimePolicy("payments.write", {
    mutating: true,
  }).allowed;
}

export function paymentsRuntimeCommandable(): boolean {
  return evaluateRuntimePolicy("payments.write", {
    mutating: true,
    dangerous: false,
  }).allowed;
}
