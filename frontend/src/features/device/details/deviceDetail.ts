export interface DeviceDetail {
  id: string
  name: string
  serialNumber?: string
  propertyId?: string
  lockId?: string
  connectionStatus: string
  healthStatus: string
  batteryPercent?: number
  firmwareVersion?: string
  lastSeenAt?: string
}
