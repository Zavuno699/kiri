export interface PaymentRefreshAction {
  paymentId?: string
}

export function createPaymentRefreshAction(
  paymentId?: string,
): PaymentRefreshAction {
  return {
    paymentId,
  }
}
