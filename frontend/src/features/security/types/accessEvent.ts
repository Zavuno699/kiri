export interface AccessEvent {
  id: string
  subjectId?: string
  propertyId?: string
  leaseId?: string
  lockId?: string
  action: string
  outcome: "allowed" | "denied" | "revoked" | "frozen"
  reason?: string
  occurredAt: string
}
