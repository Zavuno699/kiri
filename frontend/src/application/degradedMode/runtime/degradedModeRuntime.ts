import {
  getConsistencyState,
} from "../../consistency/state/consistencyStore";

import {
  securityRuntimeReady,
} from "../../security/runtime/runtimeReadiness";

import {
  getRecoveryState,
} from "../../recovery/state/recoveryStore";

import {
  evaluateDegradedMode,
} from "../evaluator/evaluateDegradedMode";

import {
  setDegradedModeState,
} from "../state/degradedModeStore";

export function refreshDegradedMode(): void {
  const snapshot =
    getConsistencyState().snapshot;

  const mode = evaluateDegradedMode({
    consistencyStatus:
      snapshot?.status ?? "unknown",
    securityReady:
      securityRuntimeReady(),
    recoveryFailed:
      getRecoveryState().status === "failed",
  });

  setDegradedModeState({
    mode,
    reason:
      mode === "normal"
        ? null
        : `frontend-entered-${mode}-mode`,
    enteredAt:
      mode === "normal"
        ? null
        : new Date().toISOString(),
    manual: false,
  });
}
