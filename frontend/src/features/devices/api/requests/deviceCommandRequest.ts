export interface DeviceCommandRequest {
  deviceId: string
  command: string
  payload?: Record<string, unknown>
}
