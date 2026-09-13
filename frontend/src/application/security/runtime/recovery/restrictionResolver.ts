import { getSecurityRuntimeState } from "../securityRuntimeStore"

export function resolveSecurityRestriction(): string | null {
  const state = getSecurityRuntimeState()

  if (state.frozen) return "security-freeze-active"
  if (!state.identity.authenticated) return "authentication-required"
  if (!state.session.session) return "session-required"
  if (!state.permissions) return "permissions-unavailable"
  if (!state.authorizationReady) return "authorization-not-ready"

  return null
}
