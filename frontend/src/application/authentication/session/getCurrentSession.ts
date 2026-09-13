import {
  getAuthenticationState,
} from "../state/authenticationStore"

export function getCurrentSession() {
  const state = getAuthenticationState()

  return {
    id: state.sessionId ?? null,
    authenticated: Boolean(state.authenticated),
  }
}
