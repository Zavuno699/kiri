import { evaluateRuntimePolicy } from "../../../../../application/security/runtime/policy/runtimePolicyEvaluator";

export function propertiesRuntimeReadable(): boolean {
  return evaluateRuntimePolicy("properties.read").allowed;
}

export function propertiesRuntimeWritable(): boolean {
  return evaluateRuntimePolicy("properties.write", {
    mutating: true,
  }).allowed;
}

export function propertiesRuntimeCommandable(): boolean {
  return evaluateRuntimePolicy("properties.write", {
    mutating: true,
    dangerous: false,
  }).allowed;
}
