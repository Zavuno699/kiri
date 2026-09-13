export interface SecurityActionPolicy {
  enabled: boolean
  confirmationRequired: boolean
  reason?: string
}

export const securityActionPolicy:
  SecurityActionPolicy = {
  enabled: false,
  confirmationRequired: true,
  reason:
    false
      ? undefined
      : "Production command ingress is not verified.",
}
