export interface LockDetail {
  id: string
  name: string
  propertyId?: string
  leaseId?: string
  deviceId?: string
  state: string
  readiness: string
  batteryPercent?: number
  firmwareVersion?: string
}
