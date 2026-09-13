import {
  getAuthenticationState,
  setAuthenticationState,
} from "../state/authenticationStore"

export function recoverAuthentication(): boolean {
  const state = getAuthenticationState()

  if (!state.principalId || !state.sessionId) {
    return false
  }

  setAuthenticationState({
    authenticated: true,
    status: "authenticated",
  })

  return true
}
