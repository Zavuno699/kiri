import { getSecurityRuntimeState } from "../../securityRuntimeStore"

export function getRuntimeIdentityStatus() {
  const state = getSecurityRuntimeState()

  return {
    authenticated: state.identity.authenticated,
    principal: state.identity.principal,
    tenantId: state.identity.tenantId,
  }
}
