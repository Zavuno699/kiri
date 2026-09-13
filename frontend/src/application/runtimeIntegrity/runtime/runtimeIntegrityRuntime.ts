import {
  securityRuntimeReady,
} from "../../security/runtime/runtimeReadiness";

import {
  getRecoveryState,
} from "../../recovery/state/recoveryStore";

import {
  getReconciliationState,
} from "../../reconciliation/state/reconciliationStore";

import {
  setRuntimeIntegrityState,
} from "../state/runtimeIntegrityStore";

export function refreshRuntimeIntegrity(): void {
  const runtimeReady = securityRuntimeReady();
  const recovery = getRecoveryState();
  const reconciliation = getReconciliationState();

  const reasons: string[] = [];

  if (!runtimeReady) {
    reasons.push("security-runtime-not-ready");
  }

  if (
    recovery.status === "degraded" ||
    recovery.status === "failed"
  ) {
    reasons.push("recovery-degraded");
  }

  if (
    reconciliation.status === "stale" ||
    reconciliation.status === "drifted" ||
    reconciliation.status === "conflicted" ||
    reconciliation.status === "failed"
  ) {
    reasons.push("reconciliation-unhealthy");
  }

  setRuntimeIntegrityState({
    runtimeReady,
    cacheConsistent: true,
    recoveryActive:
      recovery.status === "recovering",
    reconciliationHealthy:
      reasons.includes("reconciliation-unhealthy")
        ? false
        : true,
    degraded: reasons.length > 0,
    reasons,
  });
}
