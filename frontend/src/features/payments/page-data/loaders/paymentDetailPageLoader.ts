export interface PaymentDetailPageLoader {
  load(
    id: string,
  ): Promise<unknown>
}

export function createPaymentDetailPageLoader(
  load: (
    id: string,
  ) => Promise<unknown>,
): PaymentDetailPageLoader {
  return {
    load,
  }
}
