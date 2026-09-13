export interface LeaseRuntimeStatus {
  available: boolean
  degraded: boolean
  reason?: string
}

export const leaseRuntimeStatus: LeaseRuntimeStatus = {
  available: true,
  degraded: false,
}
