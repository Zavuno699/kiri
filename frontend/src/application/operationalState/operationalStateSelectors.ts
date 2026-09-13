import type {
  UnifiedOperationalState,
} from "./unifiedOperationalState";

export function selectOperationalReady(
  state: UnifiedOperationalState | null,
): boolean {
  return Boolean(
    state?.runtime.operatorReady,
  );
}

export function selectOperationalMode(
  state: UnifiedOperationalState | null,
) {
  return (
    state?.degradedMode.mode ??
    "critical"
  );
}

export function selectOperationalScore(
  state: UnifiedOperationalState | null,
): number {
  if (!state) {
    return 0;
  }

  return Math.round(
    (
      state.runtime.consistencyScore +
      state.runtime.domainHealthScore
    ) / 2,
  );
}

export function selectActiveWorkflows(
  state: UnifiedOperationalState | null,
) {
  return (
    state?.workflows.executions.filter(
      (execution) =>
        execution.status === "running" ||
        execution.status === "recovering",
    ) ?? []
  );
}
