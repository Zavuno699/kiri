export interface DeviceResponseContract {
  id: string
  name?: string
  serialNumber?: string
  propertyId?: string
  lockId?: string
  status?: string
  connectionStatus?: string
  healthStatus?: string
  batteryPercent?: number
  firmwareVersion?: string
  lastSeenAt?: string
  updatedAt?: string
}
