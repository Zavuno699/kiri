export interface PaymentQueryService {
  execute(
    query: unknown,
  ): Promise<unknown>
}

export function createPaymentQueryService(
  execute: (
    query: unknown,
  ) => Promise<unknown>,
): PaymentQueryService {
  return {
    execute,
  }
}
