import { evaluateRuntimePolicy } from "../../../../application/security/runtime/policy/runtimePolicyEvaluator";

export function evaluatePropertiesReadPolicy() {
  return evaluateRuntimePolicy("properties.read");
}

export function evaluatePropertiesWritePolicy() {
  return evaluateRuntimePolicy("properties.write", {
    mutating: true,
  });
}

export function evaluatePropertiesCommandPolicy() {
  return evaluateRuntimePolicy("properties.write", {
    mutating: true,
    dangerous: false,
  });
}
