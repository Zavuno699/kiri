export interface SecurityEventProjection {
  type: string
  severity: "info" | "warning" | "critical"
  subjectId?: string
  propertyId?: string
  leaseId?: string
  lockId?: string
  occurredAt: string
}
