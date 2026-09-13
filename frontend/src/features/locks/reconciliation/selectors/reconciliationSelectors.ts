import type { LocksReconciliationState } from "../state/reconciliationDomainState";

export const selectLocksReconciliationStatus = (
  state: LocksReconciliationState,
) => state.status;

export const selectLocksHasDrift = (
  state: LocksReconciliationState,
) =>
  state.status === "drifted" ||
  state.status === "stale" ||
  state.status === "conflicted";
