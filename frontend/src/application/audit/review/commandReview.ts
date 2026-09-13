import type { AuditEvent } from "../auditEvent";

export interface CommandReview {
  total: number;
  successful: number;
  denied: number;
  failed: number;
  cancelled: number;
}

export function buildCommandReview(
  events: AuditEvent[],
): CommandReview {
  const commandEvents = events.filter(
    (event) => event.category === "command",
  );

  return {
    total: commandEvents.length,
    successful: commandEvents.filter(
      (event) => event.outcome === "success",
    ).length,
    denied: commandEvents.filter(
      (event) => event.outcome === "denied",
    ).length,
    failed: commandEvents.filter(
      (event) => event.outcome === "failed",
    ).length,
    cancelled: commandEvents.filter(
      (event) => event.outcome === "cancelled",
    ).length,
  };
}
