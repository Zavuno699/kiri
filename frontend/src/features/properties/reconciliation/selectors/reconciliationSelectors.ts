import type { PropertiesReconciliationState } from "../state/reconciliationDomainState";

export const selectPropertiesReconciliationStatus = (
  state: PropertiesReconciliationState,
) => state.status;

export const selectPropertiesHasDrift = (
  state: PropertiesReconciliationState,
) =>
  state.status === "drifted" ||
  state.status === "stale" ||
  state.status === "conflicted";
