import type { ReconciliationState } from "./reconciliationState";

let state: ReconciliationState = {
  initialized: false,
  lastRunAt: null,
  status: "unknown",
  totalChecked: 0,
  consistent: 0,
  stale: 0,
  conflicted: 0,
  missing: 0,
  failed: 0,
};

export function getReconciliationState(): ReconciliationState {
  return state;
}

export function setReconciliationState(
  next: ReconciliationState,
): void {
  state = next;
}
