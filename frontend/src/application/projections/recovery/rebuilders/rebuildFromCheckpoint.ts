import type { ProjectionReplayEvent } from "../../replay/events/projectionReplayEvent";
import type { ProjectionReplayCheckpoint } from "../../replay/checkpoints/projectionReplayCheckpoint";
import type { ProjectionRebuilder } from "../../replay/rebuilders/projectionRebuilder";
import { rebuildProjection } from "../../replay/rebuilders/rebuildProjection";

export function rebuildFromCheckpoint<TState>(
  projectionKey: string,
  events: ProjectionReplayEvent[],
  checkpoint: ProjectionReplayCheckpoint,
  rebuilder: ProjectionRebuilder<TState>,
): TState {
  const remaining = events.filter(
    (event) =>
      event.sequence > checkpoint.lastEventSequence,
  );

  return rebuildProjection(
    projectionKey,
    remaining,
    rebuilder,
  ).state;
}
