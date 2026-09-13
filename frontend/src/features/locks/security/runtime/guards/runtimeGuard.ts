import { evaluateRuntimePolicy } from "../../../../application/security/runtime/policy/runtimePolicyEvaluator";

export function locksRuntimeReadable(): boolean {
  return evaluateRuntimePolicy("locks.read").allowed;
}

export function locksRuntimeWritable(): boolean {
  return evaluateRuntimePolicy("locks.command", {
    mutating: true,
  }).allowed;
}

export function locksRuntimeCommandable(): boolean {
  return evaluateRuntimePolicy("locks.command", {
    mutating: true,
    dangerous: true,
  }).allowed;
}
