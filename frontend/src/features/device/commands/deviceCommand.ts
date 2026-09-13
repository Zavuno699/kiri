export interface DeviceCommand {
  deviceId: string
  commandType: string
  payload?: unknown
  reason: string
  correlationId?: string
}
