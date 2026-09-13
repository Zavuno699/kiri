export interface DeviceEventPayload {
  deviceId: string
  status?: string
  state?: string
  commandId?: string
  reason?: string
  message?: string
}
