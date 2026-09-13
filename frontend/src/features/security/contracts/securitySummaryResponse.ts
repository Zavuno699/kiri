export interface SecuritySummaryResponseContract {
  posture: string
  emergencyFreezeActive: boolean
  activeCredentials: number
  revokedCredentials: number
  restrictedAccesses: number
  criticalEvents: number
  updatedAt?: string
}
