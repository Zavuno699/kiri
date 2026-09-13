export interface DeviceStateResponseContract {
  id: string
  state?: string
  status?: string
  batteryPercent?: number
  lastSeenAt?: string
  version?: number
}
