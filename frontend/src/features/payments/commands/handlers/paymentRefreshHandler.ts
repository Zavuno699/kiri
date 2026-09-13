export interface PaymentRefreshHandler {
  execute(): Promise<void>
}

export function createPaymentRefreshHandler(
  refresh: () => Promise<unknown>,
): PaymentRefreshHandler {
  return {
    async execute() {
      await refresh()
    },
  }
}
