import { getAuthenticationState } from "../state/authenticationStore";

export function canMutate(
  capability?: string,
): boolean {
  const state = getAuthenticationState();

  if (!state.authenticated) {
    return false;
  }

  if (!capability) {
    return false;
  }

  return state.capabilities.includes(capability);
}
