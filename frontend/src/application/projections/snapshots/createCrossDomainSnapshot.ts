import type { CrossDomainSnapshot } from "./crossDomainSnapshot";

export function createCrossDomainSnapshot(
  entityId: string,
  state: Record<string, unknown>,
  versions: Record<string, number>,
  consistency: CrossDomainSnapshot["consistency"],
  now = new Date(),
): CrossDomainSnapshot {
  return {
    snapshotId: `${entityId}:${now.getTime()}`,
    entityId,
    capturedAt: now.toISOString(),
    domains: Object.keys(state),
    versions,
    state,
    consistency,
  };
}
