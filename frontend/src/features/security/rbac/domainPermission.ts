import { runtimeRBACPolicy } from "../../../application/rbac/runtime/rbacRuntimePolicy";

export function evaluateSecurityRBAC() {
  return runtimeRBACPolicy("security.read");
}
