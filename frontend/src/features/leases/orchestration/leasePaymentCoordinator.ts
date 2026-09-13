export interface LeasePaymentCoordinator {
  correlate(
    leaseId: string,
    payments: unknown[],
  ): unknown[]
}

export function createLeasePaymentCoordinator():
  LeasePaymentCoordinator {
  return {
    correlate(leaseId, payments) {
      return payments.filter((payment) => {
        if (
          payment === null ||
          typeof payment !== "object"
        ) {
          return false
        }

        const candidate =
          payment as Record<string, unknown>

        return (
          candidate.leaseId === leaseId ||
          candidate.lease_id === leaseId
        )
      })
    },
  }
}
