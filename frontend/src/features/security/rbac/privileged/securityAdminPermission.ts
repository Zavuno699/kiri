import { runtimeRBACPolicy } from "../../../application/rbac/runtime/rbacRuntimePolicy";

export function securityAdminPermission() {
  return runtimeRBACPolicy("security.admin");
}
