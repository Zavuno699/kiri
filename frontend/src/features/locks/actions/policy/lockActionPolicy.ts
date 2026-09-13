export interface LockActionPolicy {
  enabled: boolean
  confirmationRequired: boolean
  reason?: string
}

export const lockActionPolicy:
  LockActionPolicy = {
  enabled: false,
  confirmationRequired: true,
  reason:
    false
      ? undefined
      : "Production command ingress is not verified.",
}
