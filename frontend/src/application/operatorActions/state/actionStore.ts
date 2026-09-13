import type { OperatorActionState } from "./actionState";

let state: OperatorActionState = {
  initialized: false,
  actions: [],
  visibleActions: [],
};

export function getOperatorActionState(): OperatorActionState {
  return state;
}

export function setOperatorActionState(
  next: OperatorActionState,
): void {
  state = next;
}
