import {
  listEventRecords,
} from "../../eventStream/streams/eventStreamStore";

import {
  appendAnomaly,
} from "../anomalies/anomalyStore";

export function detectStateDrift() {
  const records =
    listEventRecords();

  const anomalies =
    records
      .filter(
        (record) =>
          record.acknowledged &&
          !record.projected,
      )
      .map(
        (record) => ({
          id:
            `state-drift-${record.envelope.eventId}`,
          domain:
            record.envelope
              .domain,
          entityId:
            record.envelope
              .aggregateId,
          type:
            "state-drift" as const,
          severity:
            "high" as const,
          title:
            "State propagation incomplete",
          description:
            "An acknowledged event has not completed projection.",
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
