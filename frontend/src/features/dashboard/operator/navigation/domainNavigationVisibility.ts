import { runtimeRBACAllows } from "../../../application/rbac/runtime/rbacRuntimeBridge";

export function dashboardNavigationVisible(): boolean {
  return runtimeRBACAllows("dashboard.read");
}
