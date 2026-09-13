import { getSecurityRuntimeState } from "./securityRuntimeStore"

export function getSecurityRuntimeReadiness() {
  const state = getSecurityRuntimeState()

  return {
    initialized: state.session.initialized,
    authenticated: state.identity.authenticated,
    sessionActive: Boolean(state.session.session),
    authorizationReady: state.authorizationReady,
    policyReady: state.authorizationReady,
    frozen: state.frozen,
  }
}
