import {
  getAuthenticationState,
} from "../state/authenticationStore"

export function selectAuthenticationState() {
  return getAuthenticationState()
}
