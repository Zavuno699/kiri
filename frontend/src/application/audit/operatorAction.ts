export interface OperatorAction {
  id: string
  domain: string
  action: string
  subjectId?: string
  correlationId?: string
  occurredAt: string
  outcome: "requested" | "accepted" | "completed" | "failed" | "blocked"
  reason?: string
}
