export interface AuthenticationState {
  principalId?: string
  principal?: string | null
  sessionId?: string | null
  tenantId?: string | null
  status?: "anonymous" | "authenticated" | "expired" | "locked"
  authenticated?: boolean
  capabilities?: string[]
  roles?: string[]
  isAdmin?: boolean
  isSuperAdmin?: boolean
}

let state: AuthenticationState = {
  principalId: undefined,
  principal: null,
  sessionId: null,
  tenantId: null,
  status: "anonymous",
  authenticated: false,
  capabilities: [],
  roles: [],
  isAdmin: false,
  isSuperAdmin: false,
}

export function getAuthenticationState(): AuthenticationState {
  return { ...state, capabilities: [...(state.capabilities ?? [])] }
}

export function isAuthenticated(): boolean {
  return state.authenticated ?? false
}

export function setAuthenticationState(next: AuthenticationState): AuthenticationState {
  state = {
    ...state,
    ...next,
  }
  return getAuthenticationState()
}
