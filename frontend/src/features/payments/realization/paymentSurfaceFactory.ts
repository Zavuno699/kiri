import type {
  OperationalPayment,
} from "../../../domain/contracts"
import {
  paymentSummary,
} from "../presentation/PaymentSummary"

export function createPaymentSurface(
  payment?: OperationalPayment,
) {
  return payment
    ? paymentSummary(payment)
    : undefined
}
