export interface OperationalDevice {
  id: string
  propertyId?: string
  leaseId?: string
  status?: string
  online?: boolean
  firmwareVersion?: string
  lastSeenAt?: string
  metadata?: Record<string, unknown>
}
