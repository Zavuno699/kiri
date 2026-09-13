export interface PaymentRefreshController {
  refresh(
    reason?: string,
  ): Promise<void>
}

export function createPaymentRefreshController(
  refresh: () => Promise<unknown>,
): PaymentRefreshController {
  return {
    async refresh() {
      await refresh()
    },
  }
}
