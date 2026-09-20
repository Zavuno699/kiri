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

const STORAGE_KEY = "kirilock_auth_state"

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

// Initialize state from localStorage on module load
if (typeof window !== "undefined") {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored) as AuthenticationState
      state = { ...state, ...parsed }
    }
  } catch (e) {
    // Ignore localStorage errors (e.g., in iframes with storage disabled)
  }
}

function persistState(): void {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch (e) {
      // Ignore localStorage errors
    }
  }
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
  persistState()
  return getAuthenticationState()
}

export function clearAuthenticationState(): void {
  state = {
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
  if (typeof window !== "undefined") {
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch (e) {
      // Ignore localStorage errors
    }
  }
}
