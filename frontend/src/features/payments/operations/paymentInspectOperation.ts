export interface PaymentInspectOperation {
  execute(id: string): Promise<unknown>
}

export function createPaymentInspectOperation(
  inspect: (id: string) => Promise<unknown>,
): PaymentInspectOperation {
  return {
    execute: inspect,
  }
}
