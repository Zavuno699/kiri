export interface PaymentQueryClient {
  list(
    query?: unknown,
  ): Promise<unknown[]>

  detail(
    id: string,
  ): Promise<unknown>
}

export function createPaymentQueryClient(
  list: (
    query?: unknown,
  ) => Promise<unknown[]>,
  detail: (
    id: string,
  ) => Promise<unknown>,
): PaymentQueryClient {
  return {
    list,
    detail,
  }
}
