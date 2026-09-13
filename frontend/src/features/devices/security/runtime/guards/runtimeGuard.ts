import { evaluateRuntimePolicy } from "../../../../application/security/runtime/policy/runtimePolicyEvaluator";

export function devicesRuntimeReadable(): boolean {
  return evaluateRuntimePolicy("devices.read").allowed;
}

export function devicesRuntimeWritable(): boolean {
  return evaluateRuntimePolicy("devices.command", {
    mutating: true,
  }).allowed;
}

export function devicesRuntimeCommandable(): boolean {
  return evaluateRuntimePolicy("devices.command", {
    mutating: true,
    dangerous: true,
  }).allowed;
}
