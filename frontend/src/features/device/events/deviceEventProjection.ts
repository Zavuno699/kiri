export interface DeviceEventProjection {
  deviceId: string
  connectionStatus?: string
  commandStatus?: string
  commandId?: string
  occurredAt: string
}
