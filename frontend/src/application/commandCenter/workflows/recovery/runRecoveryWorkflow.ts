import {
  requireCapability,
} from "../../../security/guards/requireCapability";

import {
  createRecovery,
} from "../../recovery/createRecovery";

import {
  startRecovery,
} from "../../recovery/startRecovery";

export function runRecoveryWorkflow(
  domain: string,
  action: string,
  incidentId?: string,
) {
  requireCapability(
    "recovery.execute",
  );

  const recovery =
    createRecovery({
      domain,
      action,
      incidentId:
        incidentId ??
        null,
    });

  startRecovery(
    recovery.id,
  );

  return recovery;
}
