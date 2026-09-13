import { runtimeRBACAllows } from "../../rbac/runtime/rbacRuntimeBridge"

export function actionAllowed(
  capability = "",
): boolean {
  return capability.length > 0 &&
    runtimeRBACAllows(capability)
}
