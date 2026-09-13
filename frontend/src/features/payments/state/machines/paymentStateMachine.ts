import type { PaymentState } from "../paymentState"

export interface PaymentStateMachine {
  state: PaymentState
  transition(
    next: PaymentState,
  ): PaymentState
}

export function createPaymentStateMachine():
  PaymentStateMachine {
  let state: PaymentState = "unknown"

  return {
    get state() {
      return state
    },

    transition(next) {
      state = next
      return state
    },
  }
}
