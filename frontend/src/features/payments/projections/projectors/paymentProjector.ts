export interface PaymentProjector<T> {
  project(event: T): unknown
}

export function createPaymentProjector<T>(
  project: (event: T) => unknown,
): PaymentProjector<T> {
  return {
    project,
  }
}
