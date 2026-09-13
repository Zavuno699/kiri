export interface PaymentInvalidationController {
  invalidate(
    id?: string,
    reason?: string,
  ): void
}

export function createPaymentInvalidationController(
  invalidate: (
    id?: string,
    reason?: string,
  ) => void,
): PaymentInvalidationController {
  return {
    invalidate,
  }
}
