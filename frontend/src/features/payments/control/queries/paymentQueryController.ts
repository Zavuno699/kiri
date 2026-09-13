export interface PaymentQueryController {
  execute(
    type: string,
    params?: unknown,
  ): Promise<unknown>
}

export function createPaymentQueryController(
  execute: (
    type: string,
    params?: unknown,
  ) => Promise<unknown>,
): PaymentQueryController {
  return {
    execute,
  }
}
