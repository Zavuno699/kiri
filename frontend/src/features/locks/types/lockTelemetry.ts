export interface LockTelemetry {
  lockId: string
  batteryPercent?: number
  temperatureC?: number
  lastSeenAt?: string
  motorHealth?: string
}
