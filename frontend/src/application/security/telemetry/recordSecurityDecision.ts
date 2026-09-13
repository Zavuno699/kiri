import {
  recordSecurityAudit,
} from "./securityAuditStore";

import type {
  AuthorizationDecision,
} from "../contracts/securityDecision";

export function recordSecurityDecision(
  decision: AuthorizationDecision,
  sessionId: string | null,
): void {
  recordSecurityAudit({
    id:
      `${decision.capability}:${Date.now()}`,
    action:
      decision.capability,
    decision:
      decision.decision,
    principal:
      decision.principal,
    sessionId,
    capability:
      decision.capability,
    reason:
      decision.reason,
    occurredAt:
      decision.evaluatedAt,
  });
}
