import {
  revokeAllActiveCredentials,
} from "./revokeAllCredentials";

import {
  invalidateSecuritySession,
} from "../session/invalidateSecuritySession";

import {
  clearSecurityPrincipal,
} from "../state/securityPrincipalStore";

import {
  setSecurityMode,
} from "../state/securityModeStore";

export function prepareSecurityRecovery() {
  const revoked =
    revokeAllActiveCredentials();

  invalidateSecuritySession();
  clearSecurityPrincipal();

  setSecurityMode(
    "recovery",
  );

  return {
    credentialsRevoked:
      revoked,
    recoveryRequired:
      true,
  };
}
