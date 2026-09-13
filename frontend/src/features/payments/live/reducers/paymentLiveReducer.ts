import type { PaymentLiveState } from "../paymentLiveState"
import type { PaymentLiveEvent } from "../events/paymentLiveEvent"

export function reducePaymentLive(
  state: PaymentLiveState,
  event: PaymentLiveEvent,
): PaymentLiveState {
  if (event.type.includes("updated")) {
    return {
      ...state,
      stale: false,
      degraded: false,
      updatedAt: event.occurredAt,
    }
  }

  if (
    event.type.includes("degraded") ||
    event.type.includes("failed")
  ) {
    return {
      ...state,
      degraded: true,
      updatedAt: event.occurredAt,
    }
  }

  return state
}
