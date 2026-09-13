import type {
  ApplicationEvent,
} from "../events/applicationEvent"

export interface OperationalEventProjection {
  id: string
  category: string
  severity: "info" | "warning" | "critical"
  title: string
  detail: string
  occurredAt: string
  correlationId?: string
}

function severityFor(
  type: string,
): OperationalEventProjection["severity"] {
  if (
    type.includes("failed") ||
    type.includes("denied") ||
    type.includes("critical")
  ) {
    return "critical"
  }

  if (
    type.includes("disconnect") ||
    type.includes("revoked") ||
    type.includes("freeze")
  ) {
    return "warning"
  }

  return "info"
}

export function projectOperationalEvent(
  event: ApplicationEvent,
): OperationalEventProjection {
  return {
    id: event.id,
    category: event.type.split(".")[0] ?? "system",
    severity: severityFor(event.type),
    title: event.type,
    detail:
      typeof event.payload === "string"
        ? event.payload
        : "Operational event.",
    occurredAt: event.occurredAt,
    correlationId:
      event.correlationId,
  }
}
