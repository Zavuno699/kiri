import type { AuditEvent } from "../auditEvent"

const events: AuditEvent[] = []

export function getAuditEvents(): AuditEvent[] {
  return [...events]
}

export function listAuditEvents(): AuditEvent[] {
  return [...events]
}

export function recordAuditEvent(event: AuditEvent): AuditEvent {
  events.push(event)
  return event
}

export function clearAuditEvents(): void {
  events.length = 0
}
