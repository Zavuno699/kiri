export interface PaymentCommandPipeline {
  execute(
    command: unknown,
  ): Promise<unknown>
}

export function createPaymentCommandPipeline(
  execute: (
    command: unknown,
  ) => Promise<unknown>,
): PaymentCommandPipeline {
  return {
    execute,
  }
}
