import { runtimeRBACAllows } from "../../../../application/rbac/runtime/rbacRuntimeBridge";

export function locksNavigationVisible(): boolean {
  return runtimeRBACAllows("locks.command");
}
