import { runtimeRBACAllows } from "../../rbac/runtime/rbacRuntimeBridge"

export function actionAllowed(
  capability = "",
): boolean {
  if (!capability) return false
  return runtimeRBACAllows(capability)
}
