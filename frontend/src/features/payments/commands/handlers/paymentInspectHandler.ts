export interface PaymentInspectHandler {
  execute(id: string): Promise<unknown>
}

export function createPaymentInspectHandler(
  inspect: (id: string) => Promise<unknown>,
): PaymentInspectHandler {
  return {
    execute: inspect,
  }
}
