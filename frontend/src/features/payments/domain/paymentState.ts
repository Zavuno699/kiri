import type { OperationalPayment } from "../../../domain/contracts"

export function paymentStatus(
  payment: OperationalPayment,
): string {
  return payment.status ?? "unknown"
}

export function paymentIsSettled(
  payment: OperationalPayment,
): boolean {
  const status = payment.status?.toLowerCase()
  return status === "settled" || status === "completed"
}
