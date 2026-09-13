import {
  setMaterializedEntity,
} from "../../../materialized/materializedEntityStore";
import type { ProjectionReplayEvent } from "../events/projectionReplayEvent";
import type { ProjectionRebuilder } from "./projectionRebuilder";
import { rebuildProjection } from "./rebuildProjection";

export function replayIntoMaterializedStore<TState>(
  domain: string,
  entityId: string,
  projectionKey: string,
  events: ProjectionReplayEvent[],
  rebuilder: ProjectionRebuilder<TState>,
  updatedAt = new Date().toISOString(),
): TState {
  const result = rebuildProjection(
    projectionKey,
    events,
    rebuilder,
  );

  setMaterializedEntity(domain, entityId, {
    domain,
    id: entityId,
    version: result.version,
    updatedAt,
    data: result.state,
  });

  return result.state;
}
