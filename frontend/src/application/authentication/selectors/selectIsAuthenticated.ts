import {
  getAuthenticationState,
} from "../state/authenticationStore"

export function selectIsAuthenticated(): boolean {
  return Boolean(
    getAuthenticationState().authenticated,
  )
}
