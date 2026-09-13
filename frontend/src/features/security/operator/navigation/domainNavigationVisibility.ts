import { runtimeRBACAllows } from "../../../application/rbac/runtime/rbacRuntimeBridge";

export function securityNavigationVisible(): boolean {
  return runtimeRBACAllows("security.admin");
}
