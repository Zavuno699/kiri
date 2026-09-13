
import type { AuthorizationState } from "./authorizationState";

let state: AuthorizationState = {
  lastDecision: null,
  deniedCount: 0,
  grantedCount: 0,
};

export function getAuthorizationState(): AuthorizationState {
  return state;
}

export function recordAuthorizationDecision(
  decision: AuthorizationState["lastDecision"],
): void {
  if (!decision) {
    return;
  }

  state = {
    lastDecision: decision,
    deniedCount: state.deniedCount + (decision.allowed ? 0 : 1),
    grantedCount: state.grantedCount + (decision.allowed ? 1 : 0),
  };
}

