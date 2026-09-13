export interface PaymentResourceService {
  list(
    params?: unknown,
  ): Promise<unknown[]>

  get(
    id: string,
  ): Promise<unknown>
}

export function createPaymentResourceService(
  list: (
    params?: unknown,
  ) => Promise<unknown[]>,
  get: (
    id: string,
  ) => Promise<unknown>,
): PaymentResourceService {
  return {
    list,
    get,
  }
}
