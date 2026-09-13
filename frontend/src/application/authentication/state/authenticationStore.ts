export interface AuthenticationState {
  principalId?: string
  principal?: string | null
  sessionId?: string | null
  tenantId?: string | null
  status?: "anonymous" | "authenticated" | "expired" | "locked"
  authenticated?: boolean
  capabilities?: string[]
}

let state: AuthenticationState = {
  principalId: undefined,
  principal: null,
  sessionId: null,
  tenantId: null,
  status: "anonymous",
  authenticated: false,
  capabilities: [],
}

export function getAuthenticationState(): AuthenticationState {
  return { ...state, capabilities: [...(state.capabilities ?? [])] }
}

export function setAuthenticationState(next: AuthenticationState): AuthenticationState {
  state = {
    ...state,
    ...next,
  }
  return getAuthenticationState()
}
