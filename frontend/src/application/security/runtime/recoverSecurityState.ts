import {
  setSecurityMode,
} from "../state/securityModeStore";

import {
  setSecurityFreezeState,
} from "../state/securityFreezeStore";

export function recoverSecurityState(): void {
  setSecurityMode(
    "normal",
  );

  setSecurityFreezeState({
    frozen: false,
    initiatedAt: null,
    initiatedBy: null,
    reason: null,
    credentialRevocationRequired:
      false,
    recoveryRequired:
      false,
  });
}
