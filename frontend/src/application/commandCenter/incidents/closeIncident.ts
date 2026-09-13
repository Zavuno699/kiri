import {
  updateIncident,
} from "./incidentStore";

import {
  recordIncidentTimeline,
} from "./incidentTimelineStore";

export function closeIncident(
  incidentId: string,
  operatorId: string | null,
): void {
  const now =
    new Date().toISOString();

  updateIncident(
    incidentId,
    {
      status:
        "closed",
      operatorId,
    },
  );

  recordIncidentTimeline({
    id:
      `close:${incidentId}:${Date.now()}`,
    incidentId,
    action:
      "closed",
    actorId:
      operatorId,
    occurredAt:
      now,
    details:
      null,
  });
}
