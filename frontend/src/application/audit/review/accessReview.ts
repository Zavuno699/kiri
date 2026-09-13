import type { AuditEvent } from "../auditEvent";

export interface AccessReview {
  total: number;
  allowed: number;
  denied: number;
  expired: number;
  failed: number;
}

export function buildAccessReview(
  events: AuditEvent[],
): AccessReview {
  const authorizationEvents = events.filter(
    (event) =>
      event.category === "authorization" ||
      event.category === "navigation",
  );

  return {
    total: authorizationEvents.length,
    allowed: authorizationEvents.filter(
      (event) => event.outcome === "success",
    ).length,
    denied: authorizationEvents.filter(
      (event) => event.outcome === "denied",
    ).length,
    expired: authorizationEvents.filter(
      (event) => event.outcome === "expired",
    ).length,
    failed: authorizationEvents.filter(
      (event) => event.outcome === "failed",
    ).length,
  };
}
