export interface PaymentListPageAdapter {
  toViewModel(
    value: unknown,
  ): unknown
}

export const paymentListPageAdapter:
  PaymentListPageAdapter = {
  toViewModel(value) {
    return value
  },
}
