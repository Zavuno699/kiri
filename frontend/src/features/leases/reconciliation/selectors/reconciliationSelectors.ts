import type { LeasesReconciliationState } from "../state/reconciliationDomainState";

export const selectLeasesReconciliationStatus = (
  state: LeasesReconciliationState,
) => state.status;

export const selectLeasesHasDrift = (
  state: LeasesReconciliationState,
) =>
  state.status === "drifted" ||
  state.status === "stale" ||
  state.status === "conflicted";
