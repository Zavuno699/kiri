export interface DeviceTelemetry {
  deviceId: string
  batteryPercent?: number
  signalStrength?: number
  temperatureC?: number
  lastSeenAt?: string
}
