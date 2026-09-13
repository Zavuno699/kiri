import type { ProjectionReplayEvent } from "../events/projectionReplayEvent";

export type ProjectionRebuilderContext = {
  projectionKey: string;
  version: number;
  entityCount: number;
  correlationId?: string;
  causationId?: string;
};

export type ProjectionRebuilder<TState> = {
  createInitialState: () => TState;

  apply: (
    state: TState,
    event: ProjectionReplayEvent,
    context: ProjectionRebuilderContext,
  ) => TState;

  finalize?: (
    state: TState,
    context: ProjectionRebuilderContext,
  ) => TState;
};
