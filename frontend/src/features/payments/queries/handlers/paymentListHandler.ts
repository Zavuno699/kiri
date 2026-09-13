export interface PaymentListHandler {
  execute(params?: unknown): Promise<unknown>
}

export function createPaymentListHandler(
  query: (params?: unknown) => Promise<unknown>,
): PaymentListHandler {
  return {
    execute: query,
  }
}
