import { evaluateRuntimePolicy } from "../../../../../application/security/runtime/policy/runtimePolicyEvaluator";

export function securityRuntimeReadable(): boolean {
  return evaluateRuntimePolicy("security.read").allowed;
}

export function securityRuntimeWritable(): boolean {
  return evaluateRuntimePolicy("security.admin", {
    mutating: true,
  }).allowed;
}

export function securityRuntimeCommandable(): boolean {
  return evaluateRuntimePolicy("security.admin", {
    mutating: true,
    dangerous: false,
  }).allowed;
}
