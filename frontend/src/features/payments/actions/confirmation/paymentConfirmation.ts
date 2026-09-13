export interface PaymentConfirmation {
  commandId: string
  required: boolean
  confirmed: boolean
  reason?: string
}

export function createPaymentConfirmation(
  commandId: string,
): PaymentConfirmation {
  return {
    commandId,
    required: true,
    confirmed: false,
    reason:
      false
        ? undefined
        : "Command capability is unavailable.",
  }
}
