export interface PaymentLike {
  status: string
  reconciliationStatus: string
  amountUGX: number
}

export function settledTotal(
  payments: PaymentLike[],
): number {
  return payments
    .filter(
      (payment) =>
        payment.status === "settled",
    )
    .reduce(
      (sum, payment) =>
        sum + payment.amountUGX,
      0,
    )
}

export function unmatchedCount(
  payments: PaymentLike[],
): number {
  return payments.filter(
    (payment) =>
      payment.reconciliationStatus ===
      "unmatched",
  ).length
}
