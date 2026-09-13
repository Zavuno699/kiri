export interface DeviceLockRelationship {
  deviceId: string
  lockId: string
  state?: string
  connectionStatus?: string
  commandReady?: boolean
}
