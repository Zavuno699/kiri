import type { ProjectionReplayEvent } from "../events/projectionReplayEvent";
import type { ProjectionRebuilder } from "./projectionRebuilder";
import { orderReplayEvents } from "../events/replayOrdering";

export type ProjectionRebuildResult<TState> = {
  state: TState;
  processedEvents: number;
  lastSequence: number;
  version: number;
};

export function rebuildProjection<TState>(
  projectionKey: string,
  events: ProjectionReplayEvent[],
  rebuilder: ProjectionRebuilder<TState>,
): ProjectionRebuildResult<TState> {
  const ordered = orderReplayEvents(events);

  let state = rebuilder.createInitialState();
  let version = 0;
  let lastSequence = 0;

  for (const event of ordered) {
    state = rebuilder.apply(state, event, {
      projectionKey,
      version,
      entityCount: 0,
      correlationId: event.correlationId,
      causationId: event.causationId,
    });

    version = Math.max(version, event.eventVersion);
    lastSequence = Math.max(lastSequence, event.sequence);
  }

  if (rebuilder.finalize) {
    state = rebuilder.finalize(state, {
      projectionKey,
      version,
      entityCount: 0,
    });
  }

  return {
    state,
    processedEvents: ordered.length,
    lastSequence,
    version,
  };
}
