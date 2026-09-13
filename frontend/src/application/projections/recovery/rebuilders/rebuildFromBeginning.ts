import type { ProjectionReplayEvent } from "../../replay/events/projectionReplayEvent";
import type { ProjectionRebuilder } from "../../replay/rebuilders/projectionRebuilder";
import { rebuildProjection } from "../../replay/rebuilders/rebuildProjection";

export function rebuildFromBeginning<TState>(
  projectionKey: string,
  events: ProjectionReplayEvent[],
  rebuilder: ProjectionRebuilder<TState>,
): TState {
  return rebuildProjection(
    projectionKey,
    events,
    rebuilder,
  ).state;
}
