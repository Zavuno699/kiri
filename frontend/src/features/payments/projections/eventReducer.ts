export interface PaymentProjectionState {
  pending: number
  settled: number
  failed: number
}

export function reducePaymentEvent(
  state: PaymentProjectionState,
  event: {
    type: string
  },
): PaymentProjectionState {
  return {
    ...state,
    pending:
      event.type.includes("pending")
        ? state.pending + 1
        : state.pending,
    settled:
      event.type.includes("settled")
        ? state.settled + 1
        : state.settled,
    failed:
      event.type.includes("failed")
        ? state.failed + 1
        : state.failed,
  }
}
