import {
  requireCapability,
} from "../../security/guards/requireCapability";

import {
  freezeSecurity,
} from "../../security/emergency/freezeSecurity";

import {
  getSecurityPrincipal,
} from "../../security/state/securityPrincipalStore";

export function freezeCommandCenterSecurity(
  reason =
    "command-center-emergency-freeze",
): void {
  requireCapability(
    "security.control",
  );

  freezeSecurity(
    getSecurityPrincipal()?.id ??
      null,
    reason,
  );
}
