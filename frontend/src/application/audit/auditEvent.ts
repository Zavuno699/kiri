export type AuditCategory =
  | "authentication"
  | "authorization"
  | "command"
  | "navigation"
  | "operator"
  | "session"
  | "system"

export type AuditOutcome =
  | "success"
  | "denied"
  | "expired"
  | "failed"
  | "cancelled"

export interface AuditEvent {
  id: string
  occurredAt: string
  category: AuditCategory
  outcome: AuditOutcome
  principal: string | null
  sessionId?: string
  capability?: string
  resourceType?: string
  resourceId?: string
  correlationId?: string
  causationId?: string
  command?: string
  action?: string
  reason?: string
  metadata?: Record<string, unknown>
}
