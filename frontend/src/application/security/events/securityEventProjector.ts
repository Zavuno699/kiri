
import type { SecurityEvent } from "./securityEvent";

export interface SecurityEventProjection {
  authenticated: boolean;
  authorizationDeniedCount: number;
  sessionExpiredCount: number;
  freezeActive: boolean;
  lastEventAt: string | null;
}

export function projectSecurityEvent(
  state: SecurityEventProjection,
  event: SecurityEvent,
): SecurityEventProjection {
  return {
    authenticated:
      event.type === "authentication.succeeded"
        ? true
        : event.type === "authentication.failed"
          ? false
          : state.authenticated,
    authorizationDeniedCount:
      state.authorizationDeniedCount +
      (event.type === "authorization.denied" ? 1 : 0),
    sessionExpiredCount:
      state.sessionExpiredCount +
      (event.type === "session.expired" ? 1 : 0),
    freezeActive:
      event.type === "security.freeze" ? true : state.freezeActive,
    lastEventAt: event.occurredAt,
  };
}

