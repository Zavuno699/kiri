export interface PaymentWorkspaceAdapter {
  bind(
    value: unknown,
  ): unknown
}

export const paymentWorkspaceAdapter:
  PaymentWorkspaceAdapter = {
  bind(value) {
    return value
  },
}
