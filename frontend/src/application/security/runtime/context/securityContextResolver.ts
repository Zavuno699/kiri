import { getSecurityRuntimeState } from "../securityRuntimeStore"

export function resolveSecurityContext() {
  const state = getSecurityRuntimeState()

  return {
    principal: state.identity.principal,
    sessionId: state.session.session?.id ?? null,
    tenantId: state.identity.tenantId,
    authenticated: state.identity.authenticated,
    sessionActive: Boolean(state.session.session),
  }
}
