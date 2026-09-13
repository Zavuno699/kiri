import type { PaymentRecord } from "../types/payment"
import type { PaymentMetrics } from "../types/paymentMetrics"
import { sumPaymentValue } from "../selectors/paymentSelectors"

export function projectPaymentMetrics(
  payments: PaymentRecord[],
): PaymentMetrics {
  return {
    count: payments.length,

    settled: payments.filter(
      (payment) =>
        payment.status === "settled",
    ).length,

    pending: payments.filter(
      (payment) =>
        payment.status === "pending" ||
        payment.status === "processing",
    ).length,

    failed: payments.filter(
      (payment) =>
        payment.status === "failed" ||
        payment.status === "reversed",
    ).length,

    reconciled: payments.filter(
      (payment) =>
        payment.reconciliationStatus ===
        "matched",
    ).length,

    unmatched: payments.filter(
      (payment) =>
        payment.reconciliationStatus ===
        "unmatched",
    ).length,

    settledValueUGX: sumPaymentValue(
      payments.filter(
        (payment) =>
          payment.status === "settled",
      ),
    ),
  }
}
