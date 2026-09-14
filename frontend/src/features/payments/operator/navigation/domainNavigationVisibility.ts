import { runtimeRBACAllows } from "../../../../application/rbac/runtime/rbacRuntimeBridge";

export function paymentsNavigationVisible(): boolean {
  return runtimeRBACAllows("payments.write");
}
