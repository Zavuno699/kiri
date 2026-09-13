import type {
  EventEnvelope,
} from "../../../contracts/events/eventEnvelope"
import {
  eventTypes,
} from "../../../contracts/events/eventTypes"

export interface PaymentEventProjection {
  paymentId: string
  status?: string
  reconciliationStatus?: string
}

export class PaymentEventProjector {
  supports(type: string): boolean {
    return (
      type === eventTypes.paymentSettled ||
      type === eventTypes.paymentFailed ||
      type === eventTypes.paymentReversed
    )
  }

  project(
    event: EventEnvelope<Record<string, unknown>>,
  ): PaymentEventProjection {
    return {
      paymentId: String(
        event.payload.paymentId ??
          event.payload.payment_id ??
          "",
      ),
      status:
        typeof event.payload.status === "string"
          ? event.payload.status
          : undefined,
      reconciliationStatus:
        typeof event.payload.reconciliationStatus === "string"
          ? event.payload.reconciliationStatus
          : undefined,
    }
  }
}
