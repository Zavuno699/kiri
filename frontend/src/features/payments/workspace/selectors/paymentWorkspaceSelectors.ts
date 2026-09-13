import type { PaymentWorkspaceState } from "../state/paymentWorkspaceState"

export function selectPaymentSelection(
  state: PaymentWorkspaceState,
): string | undefined {
  return state.selectedId
}

export function selectPaymentReady(
  state: PaymentWorkspaceState,
): boolean {
  return !state.loading &&
    !state.refreshing &&
    !state.degraded
}
