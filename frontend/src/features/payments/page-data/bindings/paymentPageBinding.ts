export interface PaymentPageBinding<T = unknown> {
  pageId: string
  domain: "payments"
  route: string
  data?: T
  loading: boolean
  error?: string
}

export function createPaymentPageBinding<T>(
  pageId: string,
  route: string,
): PaymentPageBinding<T> {
  return {
    pageId,
    domain: "payments",
    route,
    loading: false,
  }
}
