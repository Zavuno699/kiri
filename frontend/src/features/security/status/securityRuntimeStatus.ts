export interface SecurityRuntimeStatus {
  available: boolean
  degraded: boolean
  reason?: string
}

export const securityRuntimeStatus: SecurityRuntimeStatus = {
  available: false,
  degraded: true,
}
