
import type { SessionStateModel } from "./sessionState";

let state: SessionStateModel = {
  session: null,
  initialized: false,
  requiresAuthentication: true,
};

export function getSessionState(): SessionStateModel {
  return state;
}

export function setSessionState(next: SessionStateModel): void {
  state = next;
}

