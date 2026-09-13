export interface DeviceActionPolicy {
  enabled: boolean
  confirmationRequired: boolean
  reason?: string
}

export const deviceActionPolicy:
  DeviceActionPolicy = {
  enabled: true,
  confirmationRequired: true,
  reason:
    true
      ? undefined
      : "Production command ingress is not verified.",
}
