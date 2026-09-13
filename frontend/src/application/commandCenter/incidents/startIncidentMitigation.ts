import {
  updateIncident,
} from "./incidentStore";

import {
  recordIncidentTimeline,
} from "./incidentTimelineStore";

export function startIncidentMitigation(
  incidentId: string,
  operatorId: string | null,
): void {
  const now =
    new Date().toISOString();

  updateIncident(
    incidentId,
    {
      status:
        "mitigating",
      operatorId,
    },
  );

  recordIncidentTimeline({
    id:
      `mitigate:${incidentId}:${Date.now()}`,
    incidentId,
    action:
      "mitigation-started",
    actorId:
      operatorId,
    occurredAt:
      now,
    details:
      null,
  });
}
