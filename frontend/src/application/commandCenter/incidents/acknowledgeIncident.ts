import {
  updateIncident,
} from "./incidentStore";

import {
  recordIncidentTimeline,
} from "./incidentTimelineStore";

export function acknowledgeIncident(
  incidentId: string,
  operatorId: string | null,
): void {
  const now =
    new Date().toISOString();

  updateIncident(
    incidentId,
    {
      status:
        "acknowledged",
      acknowledgedAt:
        now,
      operatorId,
    },
  );

  recordIncidentTimeline({
    id:
      `ack:${incidentId}:${Date.now()}`,
    incidentId,
    action:
      "acknowledged",
    actorId:
      operatorId,
    occurredAt:
      now,
    details:
      null,
  });
}
