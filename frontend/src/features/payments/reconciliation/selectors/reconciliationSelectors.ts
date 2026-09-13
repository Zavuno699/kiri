import type { PaymentsReconciliationState } from "../state/reconciliationDomainState";

export const selectPaymentsReconciliationStatus = (
  state: PaymentsReconciliationState,
) => state.status;

export const selectPaymentsHasDrift = (
  state: PaymentsReconciliationState,
) =>
  state.status === "drifted" ||
  state.status === "stale" ||
  state.status === "conflicted";
