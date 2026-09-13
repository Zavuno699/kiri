import type { SecurityRuntimeState } from "./securityRuntimeState"

const initialState: SecurityRuntimeState = {
  identity: {
    authenticated: false,
    principal: null,
    tenantId: null,
  },
  session: {
    initialized: false,
    requiresAuthentication: true,
    session: null,
  },
  permissions: null,
  authorizationReady: false,
  frozen: false,
}

let state: SecurityRuntimeState = structuredClone(initialState)

export function getSecurityRuntimeState(): SecurityRuntimeState {
  return {
    ...state,
    identity: { ...state.identity },
    session: { ...state.session },
    permissions: state.permissions ? [...state.permissions] : null,
  }
}

export function setSecurityRuntimeState(
  next: Partial<SecurityRuntimeState>,
): SecurityRuntimeState {
  state = {
    ...state,
    ...next,
    identity: {
      ...state.identity,
      ...(next.identity ?? {}),
    },
    session: {
      ...state.session,
      ...(next.session ?? {}),
    },
  }
  return getSecurityRuntimeState()
}

export function resetSecurityRuntimeState(): SecurityRuntimeState {
  state = structuredClone(initialState)
  return getSecurityRuntimeState()
}
