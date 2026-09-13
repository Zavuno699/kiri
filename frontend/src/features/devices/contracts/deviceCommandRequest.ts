export interface DeviceCommandRequestContract {
  deviceId: string
  commandType: string
  payload?: unknown
  reason?: string
  correlationId?: string
}
