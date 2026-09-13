import {
  isAuthenticated as readAuthenticationState,
} from "../state/authenticationStore";

export function isAuthenticated(): boolean {
  return readAuthenticationState();
}
