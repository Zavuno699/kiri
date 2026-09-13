import {
  getRecoveryState,
} from "../../recovery/state/recoveryStore";

import type {
  ConsistencyCheck,
} from "../contracts/consistencyCheck";

export function recoveryConsistencyCheck(): ConsistencyCheck {
  const state = getRecoveryState();

  const critical = state.status === "failed";
  const warning = state.status === "degraded";

  return {
    key: "runtime.recovery.consistency",
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
    score: critical ? 0 : warning ? 50 : 100,
    reason:
      state.lastReason ??
      "recovery-state-normal",
    checkedAt: new Date().toISOString(),
  };
}
