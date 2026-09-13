export interface AccessResponseContract {
  id: string
  subjectId: string
  propertyId?: string
  leaseId?: string
  lockId?: string
  state: string
  reason?: string
  updatedAt?: string
}
