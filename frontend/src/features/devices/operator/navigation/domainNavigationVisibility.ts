import { runtimeRBACAllows } from "../../../../application/rbac/runtime/rbacRuntimeBridge";

export function devicesNavigationVisible(): boolean {
  return runtimeRBACAllows("devices.command");
}
