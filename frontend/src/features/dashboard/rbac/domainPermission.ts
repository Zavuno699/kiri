import { runtimeRBACPolicy } from "../../../application/rbac/runtime/rbacRuntimePolicy";

export function evaluateDashboardRBAC() {
  return runtimeRBACPolicy("dashboard.read");
}
