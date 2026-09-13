import { runtimeRBACAllows } from "../../../application/rbac/runtime/rbacRuntimeBridge";

export function leasesNavigationVisible(): boolean {
  return runtimeRBACAllows("leases.write");
}
