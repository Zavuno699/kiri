import type { PaymentResource } from "./paymentResource"

export function createPaymentResource<T>(
  id: string,
): PaymentResource<T> {
  return {
    id,
    loading: false,
    refreshing: false,
    stale: false,
    version: 0,
  }
}
