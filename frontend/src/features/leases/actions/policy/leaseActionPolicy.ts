export interface LeaseActionPolicy {
  enabled: boolean
  confirmationRequired: boolean
  reason?: string
}

export const leaseActionPolicy:
  LeaseActionPolicy = {
  enabled: false,
  confirmationRequired: true,
  reason:
    false
      ? undefined
      : "Production command ingress is not verified.",
}
