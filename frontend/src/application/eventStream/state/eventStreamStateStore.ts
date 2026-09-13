import type {
  EventStreamState,
} from "../contracts/eventStreamState";

let state: EventStreamState = {
  selectedEventId:
    null,
  selectedEventType:
    null,
  selectedDomain:
    null,
  selectedAggregateId:
    null,
  correlationId:
    null,
  eventIds:
    [],
  projectionIds:
    [],
  relatedEventIds:
    [],
  loading:
    false,
  error:
    null,
};

const listeners = new Set<
  () => void
>();

export function getEventStreamState(): EventStreamState {
  return {
    ...state,
    eventIds: [
      ...state.eventIds,
    ],
    projectionIds: [
      ...state.projectionIds,
    ],
    relatedEventIds: [
      ...state.relatedEventIds,
    ],
  };
}

export function setEventStreamState(
  patch:
    Partial<EventStreamState>,
): void {
  state = {
    ...state,
    ...patch,
  };

  for (
    const listener of
      listeners
  ) {
    listener();
  }
}

export function subscribeEventStream(
  listener: () => void,
): () => void {
  listeners.add(
    listener,
  );

  return () => {
    listeners.delete(
      listener,
    );
  };
}
