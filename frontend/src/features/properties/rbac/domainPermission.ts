import { runtimeRBACPolicy } from "../../../application/rbac/runtime/rbacRuntimePolicy";

export function evaluatePropertiesRBAC() {
  return runtimeRBACPolicy("properties.read");
}
