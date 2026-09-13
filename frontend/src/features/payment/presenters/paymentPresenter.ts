import {
  buildPaymentViewModel,
} from "../models/paymentViewModel"

export function presentPayment(
  payment: Parameters<
    typeof buildPaymentViewModel
  >[0],
) {
  return buildPaymentViewModel(payment)
}
