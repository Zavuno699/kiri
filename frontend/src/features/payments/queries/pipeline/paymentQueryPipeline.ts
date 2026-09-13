export interface PaymentQueryPipeline {
  execute(
    query: unknown,
  ): Promise<unknown>
}

export function createPaymentQueryPipeline(
  execute: (
    query: unknown,
  ) => Promise<unknown>,
): PaymentQueryPipeline {
  return {
    execute,
  }
}
