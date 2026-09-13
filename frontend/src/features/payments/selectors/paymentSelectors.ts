import type { PaymentRecord } from "../types/payment"

export function selectSettledPayments(
  payments: PaymentRecord[],
) {
  return payments.filter(
    (payment) => payment.status === "settled",
  )
}

export function selectFailedPayments(
  payments: PaymentRecord[],
) {
  return payments.filter(
    (payment) =>
      payment.status === "failed" ||
      payment.status === "reversed",
  )
}

export function selectUnmatchedPayments(
  payments: PaymentRecord[],
) {
  return payments.filter(
    (payment) =>
      payment.reconciliationStatus === "unmatched",
  )
}

export function sumPaymentValue(
  payments: PaymentRecord[],
) {
  return payments.reduce(
    (sum, payment) =>
      sum + payment.amountUGX,
    0,
  )
}
