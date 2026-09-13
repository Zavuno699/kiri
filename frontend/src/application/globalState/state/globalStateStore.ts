import type {
  GlobalState,
} from "../contracts/globalState";

const initialState:
  GlobalState = {
    initialized: false,
    operational: false,
    degraded: false,
    activeDomain: null,
    activeRoute: "/",
    selectedResourceId: null,
    incidentCount: 0,
    recoveryCount: 0,
    lastEventId: null,
    lastEventType: null,
    version: 0,
    updatedAt: null,
  };

let state:
  GlobalState = {
    ...initialState,
  };

export function getGlobalState(): GlobalState {
  return {
    ...state,
  };
}

export function setGlobalState(
  next: GlobalState,
): void {
  state = {
    ...next,
  };
}

export function updateGlobalState(
  patch: Partial<GlobalState>,
): void {
  state = {
    ...state,
    ...patch,
    version:
      state.version + 1,
    updatedAt:
      new Date().toISOString(),
  };
}

export function resetGlobalState(): void {
  state = {
    ...initialState,
    updatedAt:
      new Date().toISOString(),
  };
}
