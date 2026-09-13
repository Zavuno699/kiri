import {
  getEventRecord,
  findEventsByCorrelationId,
} from "../streams/eventStreamStore";

import {
  listCommandsForEvent,
} from "./commandEventRegistry";

import {
  listProjectionsForEvent,
} from "./eventProjectionRegistry";

export function resolveEventTrace(
  eventId: string,
) {
  const record =
    getEventRecord(
      eventId,
    );

  if (!record) {
    return null;
  }

  const envelope =
    record.envelope;

  const commandLinks =
    listCommandsForEvent(
      envelope.eventType,
    );

  const projectionLinks =
    listProjectionsForEvent(
      envelope.eventType,
    );

  const related =
    envelope.correlationId
      ? findEventsByCorrelationId(
          envelope.correlationId,
        )
      : [];

  return {
    eventId,
    commandId:
      commandLinks[0]?.commandId ??
      null,
    correlationId:
      envelope.correlationId,
    causationId:
      envelope.causationId,
    projectionIds:
      projectionLinks.map(
        (link) =>
          link.projectionId,
      ),
    relatedEventIds:
      related
        .map(
          (item) =>
            item.envelope.eventId,
        )
        .filter(
          (id) =>
            id !==
            eventId,
        ),
    depth:
      0,
  };
}
