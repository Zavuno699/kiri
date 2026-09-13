import { runtimeRBACPolicy } from "../../../application/rbac/runtime/rbacRuntimePolicy";

export function evaluateLeasesRBAC() {
  return runtimeRBACPolicy("leases.read");
}
