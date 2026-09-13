import {
  setEventStreamState,
} from "../state/eventStreamStateStore";

import {
  getEventRecord,
} from "../streams/eventStreamStore";

import {
  listEventRecords,
} from "../streams/eventStreamStore";

import {
  listProjectionsForEvent,
} from "../traceability/eventProjectionRegistry";

import {
  findEventsByCorrelationId,
} from "../streams/eventStreamStore";

export function hydrateEventStream(
  eventId: string,
): void {
  setEventStreamState({
    loading:
      true,
    error:
      null,
  });

  const record =
    getEventRecord(
      eventId,
    );

  if (!record) {
    setEventStreamState({
      loading:
        false,
      error:
        "Event not found",
      selectedEventId:
        eventId,
      eventIds:
        [],
      projectionIds:
        [],
      relatedEventIds:
        [],
    });

    return;
  }

  const envelope =
    record.envelope;

  const projections =
    listProjectionsForEvent(
      envelope.eventType,
    );

  const related =
    envelope.correlationId
      ? findEventsByCorrelationId(
          envelope.correlationId,
        )
      : [];

  setEventStreamState({
    loading:
      false,
    error:
      null,
    selectedEventId:
      eventId,
    selectedEventType:
      envelope.eventType,
    selectedDomain:
      envelope.domain,
    selectedAggregateId:
      envelope.aggregateId,
    correlationId:
      envelope.correlationId,
    eventIds:
      listEventRecords()
        .map(
          (item) =>
            item.envelope
              .eventId,
        ),
    projectionIds:
      projections.map(
        (projection) =>
          projection.projectionId,
      ),
    relatedEventIds:
      related
        .map(
          (item) =>
            item.envelope
              .eventId,
        )
        .filter(
          (id) =>
            id !==
            eventId,
        ),
  });
}
