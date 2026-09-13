export interface PaymentListBinding {
  items: unknown[]
  total: number
  loading: boolean
  refreshing: boolean
}

export const emptyPaymentListBinding:
  PaymentListBinding = {
  items: [],
  total: 0,
  loading: false,
  refreshing: false,
}
