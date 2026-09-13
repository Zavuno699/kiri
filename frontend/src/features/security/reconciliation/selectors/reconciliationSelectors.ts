import type { SecurityReconciliationState } from "../state/reconciliationDomainState";

export const selectSecurityReconciliationStatus = (
  state: SecurityReconciliationState,
) => state.status;

export const selectSecurityHasDrift = (
  state: SecurityReconciliationState,
) =>
  state.status === "drifted" ||
  state.status === "stale" ||
  state.status === "conflicted";
