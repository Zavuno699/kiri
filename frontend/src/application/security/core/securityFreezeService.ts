import {
  freezeSecurity,
} from "../emergency/freezeSecurity";

import {
  prepareSecurityRecovery,
} from "../emergency/prepareSecurityRecovery";

export function emergencyFreezeSecurity(
  principalId: string | null,
  reason: string,
) {
  freezeSecurity(
    principalId,
    reason,
  );

  return prepareSecurityRecovery();
}
