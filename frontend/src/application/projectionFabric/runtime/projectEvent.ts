import {
  getProjectionState,
  setProjectionState,
} from "../state/projectionStateStore";

export type ProjectionFabricEvent<T = unknown> = {
  eventId: string;
  eventType: string;
  eventVersion: number;
  projectionKey: string;
  occurredAt: string;
  payload: T;
};

export function projectEvent<T>(
  event: ProjectionFabricEvent<T>,
  project: (
    current: unknown,
    payload: T,
  ) => unknown,
) {
  const current =
    getProjectionState(event.projectionKey);

  const nextState = project(
    current?.state,
    event.payload,
  );

  const next = {
    projectionKey: event.projectionKey,
    version: Math.max(
      current?.version ?? 0,
      event.eventVersion,
    ),
    state: nextState,
    updatedAt: event.occurredAt,
  };

  setProjectionState(
    event.projectionKey,
    next,
  );

  return next;
}
