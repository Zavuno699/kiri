export interface LockEventProjection {
  lockId?: string
  deviceId?: string
  state?: string
  commandId?: string
  commandStatus?: string
  occurredAt: string
}
