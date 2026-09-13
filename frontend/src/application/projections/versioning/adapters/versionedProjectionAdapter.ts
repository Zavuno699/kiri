import type { ProjectionVersion } from "../projectionVersion";
import { migrateProjectionState } from "../migrations/migrateProjectionState";

export type VersionedProjection<T = unknown> = {
  projectionKey: string;
  version: ProjectionVersion;
  state: T;
};

export function adaptProjection<T>(
  projection: VersionedProjection,
  targetVersion: ProjectionVersion,
): VersionedProjection<T> {
  return {
    projectionKey: projection.projectionKey,
    version: targetVersion,
    state: migrateProjectionState<T>(
      projection.projectionKey,
      projection.state,
      projection.version,
      targetVersion,
    ),
  };
}
