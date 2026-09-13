export interface OperationalLock {
  id: string
  deviceId?: string
  propertyId?: string
  status?: string
  locked?: boolean
  mode?: string
  lastCommandAt?: string
  metadata?: Record<string, unknown>
}
