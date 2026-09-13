export interface PaymentCommandService {
  execute(
    command: unknown,
  ): Promise<unknown>
}

export function createPaymentCommandService(
  execute: (
    command: unknown,
  ) => Promise<unknown>,
): PaymentCommandService {
  return {
    execute,
  }
}
