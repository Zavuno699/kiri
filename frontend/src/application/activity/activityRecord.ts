export interface ActivityRecord {
  id: string
  domain: string
  action: string
  subjectId?: string
  actorId?: string
  outcome: "requested" | "accepted" | "completed" | "failed" | "blocked"
  occurredAt: string
  correlationId?: string
}
