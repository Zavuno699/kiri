export interface PaymentListLoader {
  load(
    query?: unknown,
  ): Promise<unknown[]>
}

export function createPaymentListLoader(
  load: (
    query?: unknown,
  ) => Promise<unknown[]>,
): PaymentListLoader {
  return {
    load,
  }
}
