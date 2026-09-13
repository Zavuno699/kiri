import {
  getAuthenticationState as readState,
} from "../state/authenticationStore"

export function getAuthenticationState() {
  return readState()
}
