export interface LockEventPayload {
  lockId?: string
  deviceId?: string
  leaseId?: string
  commandId?: string
  state?: string
  status?: string
  reason?: string
}
