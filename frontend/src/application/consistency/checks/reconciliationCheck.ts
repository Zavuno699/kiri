import {
  getReconciliationState,
} from "../../reconciliation/state/reconciliationStore";

import type {
  ConsistencyCheck,
} from "../contracts/consistencyCheck";

export function reconciliationConsistencyCheck(): ConsistencyCheck {
  const state = getReconciliationState();

  const critical =
    state.status === "failed" ||
    state.status === "conflicted";

  const warning =
    state.status === "stale" ||
    state.status === "drifted" ||
    state.status === "missing";

  return {
    key: "runtime.reconciliation.consistency",
    domain: "runtime",
    status: critical
      ? "critical"
      : warning
        ? "drifted"
        : state.initialized
          ? "consistent"
          : "warning",
    severity: critical
      ? "critical"
      : warning
        ? "error"
        : state.initialized
          ? "info"
          : "warning",
    score: critical
      ? 0
      : warning
        ? 45
        : state.initialized
          ? 100
          : 50,
    reason:
      state.initialized
        ? state.status
        : "reconciliation-not-initialized",
    checkedAt: new Date().toISOString(),
  };
}
