import type { AuditEvent } from "../auditEvent";

export function selectDeniedAuditEvents(
  events: AuditEvent[],
): AuditEvent[] {
  return events.filter(
    (event) => event.outcome === "denied",
  );
}

export function selectCommandAuditEvents(
  events: AuditEvent[],
): AuditEvent[] {
  return events.filter(
    (event) => event.category === "command",
  );
}

export function selectAuthenticationAuditEvents(
  events: AuditEvent[],
): AuditEvent[] {
  return events.filter(
    (event) =>
      event.category === "authentication" ||
      event.category === "session",
  );
}

export function selectAuthorizationAuditEvents(
  events: AuditEvent[],
): AuditEvent[] {
  return events.filter(
    (event) => event.category === "authorization",
  );
}

export function selectOperatorAuditEvents(
  events: AuditEvent[],
): AuditEvent[] {
  return events.filter(
    (event) => event.category === "operator",
  );
}
