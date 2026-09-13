import {
  requireCapability,
} from "../../../security/guards/requireCapability";

import {
  resolveIncident,
} from "../../incidents/resolveIncident";

export function resolveIncidentWorkflow(
  incidentId: string,
  operatorId: string | null,
): void {
  requireCapability(
    "runtime.control",
  );

  resolveIncident(
    incidentId,
    operatorId,
  );
}
