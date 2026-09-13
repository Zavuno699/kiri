export interface PaymentEntitlementCoordinator {
  calculate(
    amount: number,
    ratePerDay: number,
  ): number
}

export function createPaymentEntitlementCoordinator():
  PaymentEntitlementCoordinator {
  return {
    calculate(amount, ratePerDay) {
      if (ratePerDay <= 0) return 0
      return Math.max(
        0,
        Math.floor(amount / ratePerDay),
      )
    },
  }
}
