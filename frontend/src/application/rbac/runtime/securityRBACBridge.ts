import { runtimeRBACAllows } from "./rbacRuntimeBridge"
import type { SecurityRuntimeState } from "../../security/runtime/securityRuntimeState"

export function securityRBACAllows(
  capability: string,
  security: SecurityRuntimeState,
): boolean {
  if (!security.identity.authenticated) return false
  return runtimeRBACAllows(capability)
}
