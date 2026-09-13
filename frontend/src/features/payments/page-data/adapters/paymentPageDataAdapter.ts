export interface PaymentPageDataAdapter {
  adapt(value: unknown): unknown
}

export const paymentPageDataAdapter:
  PaymentPageDataAdapter = {
  adapt(value) {
    return value
  },
}
