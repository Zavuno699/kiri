import type { ConsistencyState } from "./consistencyState";

let state: ConsistencyState = {
  initialized: false,
  loading: false,
  snapshot: null,
  error: null,
};

export function getConsistencyState(): ConsistencyState {
  return state;
}

export function setConsistencyState(
  next: ConsistencyState,
): void {
  state = next;
}
