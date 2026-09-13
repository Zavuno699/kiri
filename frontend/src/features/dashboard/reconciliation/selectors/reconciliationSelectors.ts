import type { DashboardReconciliationState } from "../state/reconciliationDomainState";

export const selectDashboardReconciliationStatus = (
  state: DashboardReconciliationState,
) => state.status;

export const selectDashboardHasDrift = (
  state: DashboardReconciliationState,
) =>
  state.status === "drifted" ||
  state.status === "stale" ||
  state.status === "conflicted";
