export type DeviceConnectionStatus =
  | "online"
  | "offline"
  | "degraded"
  | "unknown"

export type DeviceHealthStatus =
  | "healthy"
  | "warning"
  | "critical"
  | "unknown"

export interface DeviceRecord {
  id: string
  name: string
  serialNumber?: string
  propertyId?: string
  lockId?: string
  connectionStatus: DeviceConnectionStatus
  healthStatus: DeviceHealthStatus
  batteryPercent?: number
  firmwareVersion?: string
  lastSeenAt?: string
  createdAt?: string
}

export interface DeviceDetail extends DeviceRecord {
  model?: string
  transport?: string
  hardwareVersion?: string
  tenantId?: string
  leaseId?: string
}
