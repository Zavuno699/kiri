export interface PaymentLiveInvalidation {
  key: string
  reason: string
  occurredAt: string
}

export function createPaymentLiveInvalidation(
  key: string,
  reason: string,
): PaymentLiveInvalidation {
  return {
    key,
    reason,
    occurredAt:
      new Date().toISOString(),
  }
}
