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

let state: SecurityRuntimeState = {
  ...initialState,
  identity: { ...initialState.identity },
  session: { ...initialState.session },
}

export function getSecurityRuntimeState(): SecurityRuntimeState {
  return {
    ...state,
    identity: { ...state.identity },
    session: { ...state.session },
    permissions: state.permissions ? [...state.permissions] : null,
  }
}

export function setSecurityRuntimeState(
  patch: Partial<SecurityRuntimeState>,
): SecurityRuntimeState {
  state = {
    ...state,
    ...patch,
    identity: {
      ...state.identity,
      ...(patch.identity ?? {}),
    },
    session: {
      ...state.session,
      ...(patch.session ?? {}),
    },
  }

  return getSecurityRuntimeState()
}

export function resetSecurityRuntimeState(): SecurityRuntimeState {
  state = {
    ...initialState,
    identity: { ...initialState.identity },
    session: { ...initialState.session },
  }

  return getSecurityRuntimeState()
}
