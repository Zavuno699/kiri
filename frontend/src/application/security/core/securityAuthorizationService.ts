import {
  evaluateAuthorization,
} from "../authorization/evaluateAuthorization";

import {
  getSecuritySession,
} from "../state/securitySessionStore";

import {
  recordSecurityDecision,
} from "../telemetry/recordSecurityDecision";

export function authorizeCapability(
  capability: string,
) {
  const decision =
    evaluateAuthorization(
      capability,
    );

  recordSecurityDecision(
    decision,
    getSecuritySession()?.id ??
      null,
  );

  return decision;
}
