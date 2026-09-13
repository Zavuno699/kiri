export interface ExecuteLockCommandRequest {
  deviceId: string
  commandType: string
  payload?: unknown
  reason?: string
}
