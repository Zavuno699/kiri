import type { PaymentEvent } from "../paymentEvent"

export interface PaymentEventHandler {
  handle(event: PaymentEvent): Promise<void>
}

export function createPaymentEventHandler(
  execute: (
    event: PaymentEvent,
  ) => Promise<unknown>,
): PaymentEventHandler {
  return {
    async handle(event) {
      await execute(event)
    },
  }
}
