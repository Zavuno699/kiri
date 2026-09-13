import type { SecurityRuntimeState } from "../securityRuntimeState"

export function securityInvariant(state: SecurityRuntimeState): boolean {
  if (!state.identity.authenticated) return !state.authorizationReady
  if (!state.session.session) return !state.authorizationReady
  if (!state.permissions) return !state.authorizationReady
  return true
}
