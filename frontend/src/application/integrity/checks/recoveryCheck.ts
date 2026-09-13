import {
  getRecoveryState,
} from "../../recovery/state/recoveryStore";

export function recoveryIntegrityCheck() {
  const state = getRecoveryState();

  return {
    key: "runtime.recovery",
    domain: "runtime",
    status:
      state.status === "failed"
        ? "fail"
        : state.status === "degraded"
          ? "warn"
          : "pass",
    reason: state.lastReason ?? "recovery-state-normal",
    checkedAt: new Date().toISOString(),
  } as const;
}
