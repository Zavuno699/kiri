import type { PaymentLiveEvent } from "../events/paymentLiveEvent"

export interface PaymentLiveHandler {
  handle(
    event: PaymentLiveEvent,
  ): void
}

export function createPaymentLiveHandler(
  handle: (
    event: PaymentLiveEvent,
  ) => void,
): PaymentLiveHandler {
  return {
    handle,
  }
}
