export interface PaymentStatusLoader {
  load(
    id: string,
  ): Promise<unknown>
}

export function createPaymentStatusLoader(
  load: (
    id: string,
  ) => Promise<unknown>,
): PaymentStatusLoader {
  return {
    load,
  }
}
