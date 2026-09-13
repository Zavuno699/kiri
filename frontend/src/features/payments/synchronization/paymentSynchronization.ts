export interface PaymentSynchronization {
  synchronize(id: string): Promise<void>
}

export function createPaymentSynchronization(
  sync: (id: string) => Promise<unknown>,
): PaymentSynchronization {
  return {
    async synchronize(id) {
      await sync(id)
    },
  }
}
