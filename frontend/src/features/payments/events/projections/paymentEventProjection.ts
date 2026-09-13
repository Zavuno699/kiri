import type { PaymentEvent } from "../paymentEvent"

export interface PaymentEventProjection {
  apply(event: PaymentEvent): unknown
}
