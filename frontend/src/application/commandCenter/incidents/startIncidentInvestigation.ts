import {
  updateIncident,
} from "./incidentStore";

import {
  recordIncidentTimeline,
} from "./incidentTimelineStore";

export function startIncidentInvestigation(
  incidentId: string,
  operatorId: string | null,
): void {
  const now =
    new Date().toISOString();

  updateIncident(
    incidentId,
    {
      status:
        "investigating",
      operatorId,
    },
  );

  recordIncidentTimeline({
    id:
      `investigate:${incidentId}:${Date.now()}`,
    incidentId,
    action:
      "investigation-started",
    actorId:
      operatorId,
    occurredAt:
      now,
    details:
      null,
  });
}
