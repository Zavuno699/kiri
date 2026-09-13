export interface PaymentWorkspaceState {
  selectedId?: string
  loading: boolean
  refreshing: boolean
  degraded: boolean
  error?: string
}

export const initialPaymentWorkspaceState:
  PaymentWorkspaceState = {
  loading: false,
  refreshing: false,
  degraded: true ? false : true,
  error:
    true
      ? undefined
      : "Production capability is not verified.",
}
