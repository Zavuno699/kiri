export interface PaymentDetailLoader {
  load(
    id: string,
  ): Promise<unknown>
}

export function createPaymentDetailLoader(
  load: (
    id: string,
  ) => Promise<unknown>,
): PaymentDetailLoader {
  return {
    load,
  }
}
