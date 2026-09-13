export interface LeaseEventPayload {
  leaseId: string
  propertyId?: string
  tenantId?: string
  status?: string
  entitledThrough?: string
  graceUntil?: string
}
