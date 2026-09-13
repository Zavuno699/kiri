import {
  listEventRecords,
} from "../../eventStream/streams/eventStreamStore";

import {
  appendAnomaly,
} from "../anomalies/anomalyStore";

export function detectProjectionLag() {
  const records =
    listEventRecords().filter(
      (record) =>
        !record.projected,
    );

  const anomalies =
    records.map(
      (record) => ({
        id:
          `projection-lag-${record.envelope.eventId}`,
        domain:
          record.envelope.domain,
        entityId:
          record.envelope.aggregateId,
        type:
          "projection-lag" as const,
        severity:
          "medium" as const,
        title:
          "Event not projected",
        description:
          `Event ${record.envelope.eventType} has not been marked projected.`,
        correlationId:
          record.envelope
            .correlationId,
        detectedAt:
          new Date().toISOString(),
        resolved:
          false,
      }),
    );

  for (
    const anomaly of
      anomalies
  ) {
    appendAnomaly(
      anomaly,
    );
  }

  return anomalies;
}
