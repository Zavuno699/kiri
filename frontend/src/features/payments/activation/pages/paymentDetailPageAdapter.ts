export interface PaymentDetailPageAdapter {
  toViewModel(
    value: unknown,
  ): unknown
}

export const paymentDetailPageAdapter:
  PaymentDetailPageAdapter = {
  toViewModel(value) {
    return value
  },
}
