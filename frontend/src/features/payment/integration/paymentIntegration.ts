import {
  presentPayment,
} from "../presenters/paymentPresenter"

export function integratePayment(
  raw: Parameters<typeof presentPayment>[0],
) {
  return presentPayment(raw)
}
