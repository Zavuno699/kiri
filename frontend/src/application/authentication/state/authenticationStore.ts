export interface AuthenticationState {
  principalId?: string
  principal?: string | null
  sessionId?: string | null
  tenantId?: string | null
  status?: "anonymous" | "authenticated" | "expired" | "locked" | "loading"
  authenticated?: boolean
  capabilities?: string[]
  roles?: string[]
  isAdmin?: boolean
  isSuperAdmin?: boolean
}

const SESSION_STORAGE_KEY = "kirilock_session_id"

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

// Initialize session_id from localStorage on module load (NOT roles/flags)
// Roles and admin flags must always come from authoritative backend
if (typeof window !== "undefined") {
  try {
    const storedSessionId = localStorage.getItem(SESSION_STORAGE_KEY)
    if (storedSessionId) {
      state.sessionId = storedSessionId
      state.status = "loading" // Will rehydrate from backend
    }
  } catch (e) {
    // Ignore localStorage errors (e.g., in iframes with storage disabled)
  }
}

function persistSession(): void {
  if (typeof window !== "undefined") {
    try {
      if (state.sessionId && state.authenticated) {
        localStorage.setItem(SESSION_STORAGE_KEY, state.sessionId)
      } else {
        localStorage.removeItem(SESSION_STORAGE_KEY)
      }
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
  persistSession()
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
      localStorage.removeItem(SESSION_STORAGE_KEY)
    } catch (e) {
      // Ignore localStorage errors
    }
  }
}

export function getStoredSessionId(): string | null {
  if (typeof window !== "undefined") {
    try {
      return localStorage.getItem(SESSION_STORAGE_KEY)
    } catch (e) {
      return null
    }
  }
  return null
}
