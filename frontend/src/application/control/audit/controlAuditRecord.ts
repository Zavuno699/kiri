export interface ControlAuditRecord {
  id: string
  domain: string
  action: string
  actorId?: string
  subjectId?: string
  result:
    | "allowed"
    | "blocked"
    | "failed"
    | "completed"
  reason?: string
  occurredAt: string
  correlationId?: string
}
