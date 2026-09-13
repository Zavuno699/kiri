export interface LockRuntimeStatus {
  available: boolean
  degraded: boolean
  reason?: string
}

export const lockRuntimeStatus: LockRuntimeStatus = {
  available: true,
  degraded: false,
}
