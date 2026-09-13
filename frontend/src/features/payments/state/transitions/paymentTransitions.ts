import type { PaymentState } from "../paymentState"

export interface PaymentTransition {
  from: PaymentState
  to: PaymentState
  event: string
}

export const paymentTransitions:
  PaymentTransition[] = [
  {
    from: "unknown",
    to: "loading",
    event: "payments.load",
  },
  {
    from: "loading",
    to: "active",
    event: "payments.loaded",
  },
  {
    from: "active",
    to: "degraded",
    event: "payments.degraded",
  },
  {
    from: "degraded",
    to: "active",
    event: "payments.recovered",
  },
  {
    from: "active",
    to: "failed",
    event: "payments.failed",
  },
]
