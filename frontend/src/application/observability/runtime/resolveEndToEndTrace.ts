import type {
  EndToEndTrace,
} from "../contracts/endToEndTrace";

import {
  listEventRecords,
  findEventsByCorrelationId,
} from "../../eventStream/streams/eventStreamStore";

import {
  listAuditRecords,
} from "../audit/auditStore";

import {
  resolveEventTrace,
} from "../../eventStream/traceability/resolveEventTrace";

export function resolveEndToEndTrace(
  correlationId: string,
): EndToEndTrace {
  const events =
    findEventsByCorrelationId(
      correlationId,
    );

  const eventIds =
    events.map(
      (event) =>
        event.envelope.eventId,
    );

  const projectionIds =
    events.flatMap(
      (event) =>
        resolveEventTrace(
          event.envelope
            .eventId,
        )?.projectionIds ??
        [],
    );

  const audits =
    listAuditRecords().filter(
      (record) =>
        record.correlationId ===
        correlationId,
    );

  const stateIds =
    events
      .map(
        (event) =>
          event.envelope
            .aggregateId,
      )
      .filter(
        (
          id,
        ): id is string =>
          Boolean(id),
      );

  const commandAudit =
    audits.find(
      (audit) =>
        audit.category ===
        "command",
    );

  const status =
    events.length ===
    0
      ? "unknown"
      : events.every(
            (event) =>
              event.projected,
          )
        ? "complete"
        : events.some(
              (event) =>
                event.acknowledged,
            )
          ? "partial"
          : "blocked";

  void listEventRecords;

  return {
    id:
      `trace-${correlationId}`,
    commandId:
      commandAudit?.action ??
      null,
    commandCorrelationId:
      correlationId,
    eventIds,
    projectionIds: [
      ...new Set(
        projectionIds,
      ),
    ],
    stateEntityIds: [
      ...new Set(
        stateIds,
      ),
    ],
    auditIds:
      audits.map(
        (audit) =>
          audit.id,
      ),
    anomalyIds:
      [],
    status:
      status as EndToEndTrace["status"],
  };
}
