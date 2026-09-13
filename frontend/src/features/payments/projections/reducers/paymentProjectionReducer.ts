export interface PaymentProjectionState {
  status: string
  version: number
  updatedAt: string
}

export function reducePaymentProjection(
  state: PaymentProjectionState,
  event: {
    type: string
  },
): PaymentProjectionState {
  return {
    ...state,
    status: event.type,
    version: state.version + 1,
    updatedAt: new Date().toISOString(),
  }
}
