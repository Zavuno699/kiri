import {
  setSecurityMode,
} from "../state/securityModeStore";

import {
  setSecurityFreezeState,
} from "../state/securityFreezeStore";

export function freezeSecurity(
  principalId: string | null,
  reason: string,
): void {
  const now =
    new Date().toISOString();

  setSecurityMode(
    "frozen",
  );

  setSecurityFreezeState({
    frozen: true,
    initiatedAt: now,
    initiatedBy:
      principalId,
    reason,
    credentialRevocationRequired:
      true,
    recoveryRequired:
      true,
  });
}
