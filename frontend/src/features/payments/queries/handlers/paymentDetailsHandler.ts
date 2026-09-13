export interface PaymentDetailsHandler {
  execute(id: string): Promise<unknown>
}

export function createPaymentDetailsHandler(
  query: (id: string) => Promise<unknown>,
): PaymentDetailsHandler {
  return {
    execute: query,
  }
}
