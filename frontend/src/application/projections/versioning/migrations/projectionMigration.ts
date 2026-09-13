import type { ProjectionVersion } from "../projectionVersion";

export type ProjectionMigration<TFrom = unknown, TTo = unknown> = {
  projectionKey: string;
  from: ProjectionVersion;
  to: ProjectionVersion;
  migrate: (state: TFrom) => TTo;
};
