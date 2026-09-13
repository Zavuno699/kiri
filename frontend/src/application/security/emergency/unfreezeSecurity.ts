import {
  setSecurityMode,
} from "../state/securityModeStore";

import {
  setSecurityFreezeState,
} from "../state/securityFreezeStore";

export function unfreezeSecurity(): void {
  setSecurityMode(
    "recovery",
  );

  setSecurityFreezeState({
    frozen: false,
    initiatedAt: null,
    initiatedBy: null,
    reason: null,
    credentialRevocationRequired:
      false,
    recoveryRequired:
      true,
  });
}
