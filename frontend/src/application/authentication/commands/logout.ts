import {
  clearAuthenticationState,
  getAuthenticationState,
} from "../state/authenticationStore"
import { apiFetch } from "../../../api/client"

interface RevokeSessionRequest {
  session_id: string
}

export async function logout() {
  const authState = getAuthenticationState()
  
  // Revoke session on backend if we have a session ID
  if (authState.authenticated && authState.sessionId) {
    try {
      const request: RevokeSessionRequest = {
        session_id: authState.sessionId,
      }
      await apiFetch("/sessions/revoke", {
        method: "POST",
        body: JSON.stringify(request),
      }, { useIdentityService: true })
    } catch (error) {
      // Log but don't block logout on backend failure
      console.error("Failed to revoke session:", error)
    }
  }
  
  // Clear client auth state
  clearAuthenticationState()
}
