import type {
  CanonicalRuntimeState,
} from "../runtimeContract";

let state: CanonicalRuntimeState = {
  initialized: false,
  status: "unknown",
  startedAt: null,
  lastRefreshAt: null,
  reasons: [],
};

export function getCanonicalRuntimeState(): CanonicalRuntimeState {
  return state;
}

export function setCanonicalRuntimeState(
  next: CanonicalRuntimeState,
): void {
  state = next;
}
