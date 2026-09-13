import {
  getRuntimeIntegrityState,
} from "../../runtimeIntegrity/state/runtimeIntegrityStore";

import type {
  ConsistencyCheck,
} from "../contracts/consistencyCheck";

export function runtimeIntegrityConsistencyCheck(): ConsistencyCheck {
  const state = getRuntimeIntegrityState();

  const critical =
    !state.runtimeReady;

  const warning =
    state.degraded ||
    !state.cacheConsistent ||
    !state.reconciliationHealthy;

  return {
    key: "runtime.integrity.consistency",
    domain: "runtime",
    status: critical
      ? "critical"
      : warning
        ? "warning"
        : "consistent",
    severity: critical
      ? "critical"
      : warning
        ? "warning"
        : "info",
    score: critical
      ? 0
      : warning
        ? 50
        : 100,
    reason:
      state.reasons.join(", ") ||
      "runtime-integrity-healthy",
    checkedAt: new Date().toISOString(),
  };
}
