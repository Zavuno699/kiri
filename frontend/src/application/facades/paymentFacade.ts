export interface PaymentFacade {
  list(filters?: unknown): Promise<unknown>
  get(id: string): Promise<unknown>
  reconcile(id: string, reason: string): Promise<unknown>
}

export function createPaymentFacade(
  list: (filters?: unknown) => Promise<unknown>,
  get: (id: string) => Promise<unknown>,
  reconcile: (id: string, reason: string) => Promise<unknown>,
): PaymentFacade {
  return { list, get, reconcile }
}
