import type { OperatorActivityState } from "./operatorActivityState";

let state: OperatorActivityState = {
  initialized: false,
  items: [],
  loading: false,
  error: null,
};

export function getOperatorActivityState(): OperatorActivityState {
  return state;
}

export function setOperatorActivityState(
  next: OperatorActivityState,
): void {
  state = next;
}
