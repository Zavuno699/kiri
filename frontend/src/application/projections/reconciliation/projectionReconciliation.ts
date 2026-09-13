export type ProjectionConsistencyState =
  | "consistent"
  | "stale"
  | "diverged"
  | "missing";

export type ProjectionReconciliationInput = {
  domain: string;
  entityId: string;
  materializedVersion?: number;
  sourceVersion: number;
  materializedUpdatedAt?: string;
  sourceUpdatedAt: string;
};

export type ProjectionReconciliationResult = {
  domain: string;
  entityId: string;
  state: ProjectionConsistencyState;
  versionDelta: number;
  ageMs: number;
  requiresRefresh: boolean;
};

export function reconcileProjection(
  input: ProjectionReconciliationInput,
): ProjectionReconciliationResult {
  const materializedVersion = input.materializedVersion ?? 0;
  const versionDelta = input.sourceVersion - materializedVersion;
  const materializedMissing = input.materializedVersion === undefined;

  const ageMs = input.materializedUpdatedAt
    ? Math.max(
        0,
        Date.parse(input.sourceUpdatedAt) -
          Date.parse(input.materializedUpdatedAt),
      )
    : Number.POSITIVE_INFINITY;

  const state: ProjectionConsistencyState = materializedMissing
    ? "missing"
    : versionDelta === 0
      ? "consistent"
      : versionDelta > 0
        ? "stale"
        : "diverged";

  return {
    domain: input.domain,
    entityId: input.entityId,
    state,
    versionDelta,
    ageMs,
    requiresRefresh:
      materializedMissing || versionDelta > 0 || versionDelta < 0,
  };
}
