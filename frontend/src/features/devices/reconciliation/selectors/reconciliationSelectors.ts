import type { DevicesReconciliationState } from "../state/reconciliationDomainState";

export const selectDevicesReconciliationStatus = (
  state: DevicesReconciliationState,
) => state.status;

export const selectDevicesHasDrift = (
  state: DevicesReconciliationState,
) =>
  state.status === "drifted" ||
  state.status === "stale" ||
  state.status === "conflicted";
