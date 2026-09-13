export interface PropertyActionPolicy {
  enabled: boolean
  confirmationRequired: boolean
  reason?: string
}

export const propertyActionPolicy:
  PropertyActionPolicy = {
  enabled: false,
  confirmationRequired: true,
  reason:
    false
      ? undefined
      : "Production command ingress is not verified.",
}
