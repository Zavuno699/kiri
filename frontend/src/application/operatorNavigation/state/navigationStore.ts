import type { OperatorNavigationState } from "./navigationState";

let state: OperatorNavigationState = {
  initialized: false,
  items: [],
  visibleItems: [],
  restrictedItems: [],
};

export function getOperatorNavigationState(): OperatorNavigationState {
  return state;
}

export function setOperatorNavigationState(
  next: OperatorNavigationState,
): void {
  state = next;
}
