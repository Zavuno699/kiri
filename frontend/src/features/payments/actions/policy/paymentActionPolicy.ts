export interface PaymentActionPolicy {
  enabled: boolean
  confirmationRequired: boolean
  reason?: string
}

export const paymentActionPolicy:
  PaymentActionPolicy = {
  enabled: false,
  confirmationRequired: true,
  reason:
    false
      ? undefined
      : "Production command ingress is not verified.",
}
