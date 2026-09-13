import {
  requireCapability,
} from "../../../security/guards/requireCapability";

import {
  acknowledgeIncident,
} from "../../incidents/acknowledgeIncident";

import {
  startIncidentInvestigation,
} from "../../incidents/startIncidentInvestigation";

export function investigateIncidentWorkflow(
  incidentId: string,
  operatorId: string | null,
): void {
  requireCapability(
    "dashboard.read",
  );

  acknowledgeIncident(
    incidentId,
    operatorId,
  );

  startIncidentInvestigation(
    incidentId,
    operatorId,
  );
}
