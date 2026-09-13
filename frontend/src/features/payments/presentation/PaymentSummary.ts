import type {
  OperationalPayment,
} from "../../../domain/contracts"

export function paymentSummary(
  payment: OperationalPayment,
) {
  return {
    id: payment.id,
    leaseId: payment.leaseId ?? "—",
    amount:
      payment.amount === undefined
        ? "—"
        : String(payment.amount),
    currency: payment.currency ?? "—",
    status: payment.status ?? "unknown",
    reference: payment.reference ?? "—",
    settledAt: payment.settledAt ?? "—",
  }
}
