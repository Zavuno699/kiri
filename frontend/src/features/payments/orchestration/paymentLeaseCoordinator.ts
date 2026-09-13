export interface PaymentLeaseCoordinator {
  attach(
    payment: Record<string, unknown>,
    lease: Record<string, unknown>,
  ): Record<string, unknown>
}

export function createPaymentLeaseCoordinator():
  PaymentLeaseCoordinator {
  return {
    attach(payment, lease) {
      return {
        ...payment,
        leaseContext: {
          id: lease.id,
          status: lease.status,
        },
      }
    },
  }
}
