import {
  getAuthenticationState,
} from "../state/authenticationStore"

export const authenticationFacade = {
  getState() {
    return getAuthenticationState()
  },

  isAuthenticated() {
    return Boolean(
      getAuthenticationState().authenticated,
    )
  },

  principalId() {
    return (
      getAuthenticationState().principalId ?? null
    )
  },

  sessionId() {
    return (
      getAuthenticationState().sessionId ?? null
    )
  },
}
