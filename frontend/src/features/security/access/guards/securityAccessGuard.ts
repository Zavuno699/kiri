import {
  getSecurityRuntimeState,
} from "../../../../application/security/runtime/securityRuntimeStore"

export function securityAccessAllowed(
  capability?: string,
): boolean {
  const state = getSecurityRuntimeState()

  if (!state.identity.authenticated) {
    return false
  }

  if (state.frozen) {
    return false
  }

  if (!capability) {
    return true
  }

  return (
    state.permissions?.includes("*") === true ||
    state.permissions?.includes(capability) === true
  )
}
