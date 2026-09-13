import {
  requireCapability,
} from "../../../security/guards/requireCapability";

import {
  startIncidentMitigation,
} from "../../incidents/startIncidentMitigation";

export function mitigateIncidentWorkflow(
  incidentId: string,
  operatorId: string | null,
): void {
  requireCapability(
    "runtime.control",
  );

  startIncidentMitigation(
    incidentId,
    operatorId,
  );
}
