export interface SecurityEventPayload {
  subjectId?: string
  propertyId?: string
  leaseId?: string
  lockId?: string
  action?: string
  severity?: string
  message?: string
}
