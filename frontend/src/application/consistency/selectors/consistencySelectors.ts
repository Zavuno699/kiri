import type { ConsistencyState } from "../state/consistencyState";

export const selectConsistencySnapshot = (
  state: ConsistencyState,
) => state.snapshot;

export const selectConsistencyStatus = (
  state: ConsistencyState,
) => state.snapshot?.status ?? "unknown";

export const selectConsistencyScore = (
  state: ConsistencyState,
) => state.snapshot?.score ?? 0;

export const selectConsistencyChecks = (
  state: ConsistencyState,
) =>
  state.snapshot?.checks ?? [];
