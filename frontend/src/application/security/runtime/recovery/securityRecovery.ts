import { getSecurityRuntimeState, setSecurityRuntimeState } from "../securityRuntimeStore"

export function recoverSecurityRuntime(): boolean {
  const state = getSecurityRuntimeState()

  const ready =
    state.identity.authenticated &&
    state.session.session !== null &&
    state.permissions !== null &&
    !state.frozen

  if (!ready) return false

  setSecurityRuntimeState({ authorizationReady: true })
  return true
}
