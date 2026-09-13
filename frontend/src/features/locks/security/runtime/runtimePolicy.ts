import { evaluateRuntimePolicy } from "../../../../application/security/runtime/policy/runtimePolicyEvaluator";

export function evaluateLocksReadPolicy() {
  return evaluateRuntimePolicy("locks.read");
}

export function evaluateLocksWritePolicy() {
  return evaluateRuntimePolicy("locks.command", {
    mutating: true,
  });
}

export function evaluateLocksCommandPolicy() {
  return evaluateRuntimePolicy("locks.command", {
    mutating: true,
    dangerous: true,
  });
}
