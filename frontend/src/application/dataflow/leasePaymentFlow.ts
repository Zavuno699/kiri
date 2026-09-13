export interface LeasePaymentFlow {
  leaseId: string
  paymentIds: string[]
}

export function createLeasePaymentFlow(
  leaseId: string,
  paymentIds: string[],
): LeasePaymentFlow {
  return {
    leaseId,
    paymentIds: [...paymentIds],
  }
}
