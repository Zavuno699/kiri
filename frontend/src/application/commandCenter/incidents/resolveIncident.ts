import {
  updateIncident,
} from "./incidentStore";

import {
  recordIncidentTimeline,
} from "./incidentTimelineStore";

export function resolveIncident(
  incidentId: string,
  operatorId: string | null,
): void {
  const now =
    new Date().toISOString();

  updateIncident(
    incidentId,
    {
      status:
        "resolved",
      resolvedAt:
        now,
      operatorId,
    },
  );

  recordIncidentTimeline({
    id:
      `resolve:${incidentId}:${Date.now()}`,
    incidentId,
    action:
      "resolved",
    actorId:
      operatorId,
    occurredAt:
      now,
    details:
      null,
  });
}
