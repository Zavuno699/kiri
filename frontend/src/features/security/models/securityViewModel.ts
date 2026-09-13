export interface SecurityViewModel {
  posture: string
  emergencyFreeze: string
  activeCredentials: string
  revokedCredentials: string
  restrictedAccess: string
  criticalEvents: string
}

export function buildSecurityViewModel(
  input: {
    posture: string
    emergencyFreezeActive: boolean
    activeCredentials: number
    revokedCredentials: number
    restrictedAccesses: number
    criticalEvents: number
  },
): SecurityViewModel {
  return {
    posture: input.posture,
    emergencyFreeze:
      input.emergencyFreezeActive
        ? "ACTIVE"
        : "INACTIVE",
    activeCredentials:
      input.activeCredentials.toLocaleString(),
    revokedCredentials:
      input.revokedCredentials.toLocaleString(),
    restrictedAccess:
      input.restrictedAccesses.toLocaleString(),
    criticalEvents:
      input.criticalEvents.toLocaleString(),
  }
}
