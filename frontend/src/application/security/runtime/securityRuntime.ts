import { getSecurityRuntimeState } from "./securityRuntimeStore"

export function isSecurityRuntimeReady(): boolean {
  const state = getSecurityRuntimeState()
  return (
    state.authorizationReady &&
    state.identity.authenticated &&
    Boolean(state.session.session)
  )
}

export function isSecurityRuntimeFrozen(): boolean {
  return getSecurityRuntimeState().frozen
}
