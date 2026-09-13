export interface PaymentOperations {
  load(paymentId: string): Promise<unknown>
  reconcile(paymentId: string): Promise<unknown>
}

export function createPaymentOperations(
  load: (id: string) => Promise<unknown>,
  reconcile: (id: string) => Promise<unknown>,
): PaymentOperations {
  return { load, reconcile }
}
