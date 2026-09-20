import { apiFetch } from "../../../api/client"
import {
  setAuthenticationState,
  clearAuthenticationState,
  getStoredSessionId,
} from "../state/authenticationStore"

export interface SessionMeResponse {
  subject_id: string
  email: string
  roles: string[]
  is_admin: boolean
  is_super_admin: boolean
}

/**
 * Rehydrates authentication state from backend using stored session_id
 * Called on app startup to restore session after page refresh
 * Only the session_id is persisted; roles and admin flags come from authoritative backend
 */
export async function rehydrateSession(): Promise<void> {
  const storedSessionId = getStoredSessionId()

  if (!storedSessionId) {
    // No session to rehydrate - user is anonymous
    clearAuthenticationState()
    return
  }

  try {
    const response = await apiFetch<SessionMeResponse>("/me", {
      method: "GET",
    }, { useIdentityService: true })

    // Populate auth state from authoritative backend response
    setAuthenticationState({
      principalId: response.subject_id,
      principal: response.email,
      sessionId: storedSessionId,
      tenantId: null,
      status: "authenticated",
      authenticated: true,
      capabilities: [], // Derived from roles, not client-supplied
      roles: response.roles,
      isAdmin: response.is_admin,
      isSuperAdmin: response.is_super_admin,
    })
  } catch (error) {
    // Session is invalid/revoked/expired - clear it
    clearAuthenticationState()
  }
}
