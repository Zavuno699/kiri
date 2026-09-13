export interface CommandAuditRecord {
  id: string
  commandId: string
  domain: string
  action: string
  actorId?: string
  result:
    | "prepared"
    | "authorized"
    | "confirmed"
    | "completed"
    | "failed"
    | "blocked"
  occurredAt: string
  reason?: string
}
