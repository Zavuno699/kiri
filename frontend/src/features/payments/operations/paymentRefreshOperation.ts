export interface PaymentRefreshOperation {
  execute(): Promise<void>
}

export function createPaymentRefreshOperation(
  refresh: () => Promise<unknown>,
): PaymentRefreshOperation {
  return {
    async execute() {
      await refresh()
    },
  }
}
