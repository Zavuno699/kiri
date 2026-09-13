import { getSecurityRuntimeState } from "../securityRuntimeStore"

export function getSecurityDiagnostics() {
  const state = getSecurityRuntimeState()

  return {
    initialized: state.session.initialized,
    authenticated: state.identity.authenticated,
    sessionActive: Boolean(state.session.session),
    authorizationReady: state.authorizationReady,
    policyReady: state.authorizationReady,
    frozen: state.frozen,
    principal: state.identity.principal,
    tenantId: state.identity.tenantId,
    sessionId: state.session.session?.id ?? null,
  }
}
