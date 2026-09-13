import type { PaymentState } from "../paymentState"

export function reducePaymentState(
  state: PaymentState,
  event: string,
): PaymentState {
  switch (event) {
    case "payments.load":
      return "loading"

    case "payments.loaded":
      return "active"

    case "payments.degraded":
      return "degraded"

    case "payments.recovered":
      return "active"

    case "payments.failed":
      return "failed"

    default:
      return state
  }
}
