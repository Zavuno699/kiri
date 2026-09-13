import {
  requireCapability,
} from "../../../security/guards/requireCapability";

import {
  startRecoveryVerification,
} from "../../recovery/startRecoveryVerification";

import {
  completeRecovery,
} from "../../recovery/completeRecovery";

export function verifyRecoveryWorkflow(
  recoveryId: string,
): void {
  requireCapability(
    "recovery.execute",
  );

  startRecoveryVerification(
    recoveryId,
  );

  completeRecovery(
    recoveryId,
  );
}
