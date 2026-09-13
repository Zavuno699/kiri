import type {
  EventEnvelope,
} from "../../../contracts/events/eventEnvelope"
import {
  eventTypes,
} from "../../../contracts/events/eventTypes"

export interface SecurityEventProjection {
  subjectId?: string
  propertyId?: string
  leaseId?: string
  lockId?: string
  action?: string
  severity: "info" | "warning" | "critical"
}

export class SecurityEventProjector {
  supports(type: string): boolean {
    return (
      type === eventTypes.accessGranted ||
      type === eventTypes.accessDenied ||
      type === eventTypes.accessRevoked ||
      type === eventTypes.freezeApplied ||
      type === eventTypes.freezeReleased
    )
  }

  project(
    event: EventEnvelope<Record<string, unknown>>,
  ): SecurityEventProjection {
    const severity =
      event.type ===
      eventTypes.accessDenied
        ? "critical"
        : event.type ===
            eventTypes.accessRevoked ||
          event.type ===
            eventTypes.freezeApplied
          ? "warning"
          : "info"

    return {
      subjectId:
        typeof event.payload.subjectId === "string"
          ? event.payload.subjectId
          : undefined,
      propertyId:
        typeof event.payload.propertyId === "string"
          ? event.payload.propertyId
          : undefined,
      leaseId:
        typeof event.payload.leaseId === "string"
          ? event.payload.leaseId
          : undefined,
      lockId:
        typeof event.payload.lockId === "string"
          ? event.payload.lockId
          : undefined,
      action:
        typeof event.payload.action === "string"
          ? event.payload.action
          : event.type,
      severity,
    }
  }
}
