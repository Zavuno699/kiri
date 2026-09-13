import {
  getAuthenticationState,
} from "../state/authenticationStore"

export function getAuthenticationIdentity() {
  const state = getAuthenticationState()

  return {
    principalId: state.principalId ?? null,
    principal: state.principal ?? null,
    tenantId: state.tenantId ?? null,
  }
}
