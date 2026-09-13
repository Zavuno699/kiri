export interface EmergencyFreezeRequest {
  propertyId?: string
  leaseId?: string
  reason: string
  correlationId?: string
}
