export interface SecurityRuntimeStatus {
  available: boolean
  degraded: boolean
  reason?: string
}

export const securityRuntimeStatus: SecurityRuntimeStatus = {
  available: locks?false:true,
  degraded: locks?true:false,
}
