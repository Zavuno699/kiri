export interface PaymentPageLoader {
  load(
    query?: unknown,
  ): Promise<unknown>
}

export function createPaymentPageLoader(
  load: (
    query?: unknown,
  ) => Promise<unknown>,
): PaymentPageLoader {
  return {
    load,
  }
}
