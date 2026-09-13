import { runtimeRBACPolicy } from "../../../application/rbac/runtime/rbacRuntimePolicy";

export function evaluateLocksRBAC() {
  return runtimeRBACPolicy("locks.read");
}
