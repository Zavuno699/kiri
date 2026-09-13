import {
  setAuthenticationState,
} from "../state/authenticationStore"

export function logout() {
  return setAuthenticationState({
    principal: null,
    principalId: undefined,
    sessionId: null,
    authenticated: false,
    status: "anonymous",
    capabilities: [],
  })
}
