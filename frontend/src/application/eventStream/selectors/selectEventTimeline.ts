import {
  listEventRecords,
} from "../streams/eventStreamStore";

import {
  getEvent,
} from "../registry/eventRegistry";

import type {
  EventTimelineItem,
} from "../contracts/eventTimelineItem";

export function selectEventTimeline(
  domain?: string,
): EventTimelineItem[] {
  return listEventRecords()
    .filter(
      (record) =>
        !domain ||
        record.envelope
          .domain ===
          domain,
    )
    .map(
      (record) => {
        const definition =
          getEvent(
            record.envelope
              .eventType,
          );

        return {
          id:
            record.envelope
              .eventId,
          eventType:
            record.envelope
              .eventType,
          domain:
            record.envelope
              .domain,
          label:
            definition?.label ??
            record.envelope
              .eventType,
          timestamp:
            record.envelope
              .occurredAt,
          aggregateId:
            record.envelope
              .aggregateId,
          correlationId:
            record.envelope
              .correlationId,
          status:
            record.projected
              ? "projected"
              : record.acknowledged
                ? "acknowledged"
                : "observed",
        };
      },
    );
}
