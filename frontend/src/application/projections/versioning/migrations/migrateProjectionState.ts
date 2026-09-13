import type { ProjectionVersion } from "../projectionVersion";
import {
  getProjectionMigration,
} from "./projectionMigrationRegistry";

export function migrateProjectionState<T>(
  projectionKey: string,
  state: unknown,
  from: ProjectionVersion,
  to: ProjectionVersion,
): T {
  if (
    from.major === to.major &&
    from.minor === to.minor &&
    from.patch === to.patch
  ) {
    return state as T;
  }

  const migration = getProjectionMigration(
    projectionKey,
    from,
    to,
  );

  if (!migration) {
    throw new Error(
      `No projection migration registered for ${projectionKey}`,
    );
  }

  return migration.migrate(state) as T;
}
