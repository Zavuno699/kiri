export interface EmergencyFreezeCommand {
  propertyId?: string
  leaseId?: string
  reason: string
  correlationId?: string
}
