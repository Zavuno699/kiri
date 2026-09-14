import { evaluateRuntimePolicy } from "../../../../../application/security/runtime/policy/runtimePolicyEvaluator";

export function leasesRuntimeReadable(): boolean {
  return evaluateRuntimePolicy("leases.read").allowed;
}

export function leasesRuntimeWritable(): boolean {
  return evaluateRuntimePolicy("leases.write", {
    mutating: true,
  }).allowed;
}

export function leasesRuntimeCommandable(): boolean {
  return evaluateRuntimePolicy("leases.write", {
    mutating: true,
    dangerous: false,
  }).allowed;
}
