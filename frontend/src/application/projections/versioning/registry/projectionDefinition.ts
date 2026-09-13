import type { ProjectionVersionRange } from "../projectionVersionRange";

export type ProjectionDefinition = {
  projectionKey: string;
  versions: ProjectionVersionRange;
  replayable: boolean;
  rebuildable: boolean;
  materialized: boolean;
  strictConsistency: boolean;
};
