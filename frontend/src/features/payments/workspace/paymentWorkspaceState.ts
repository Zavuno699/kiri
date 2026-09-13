export interface PaymentWorkspaceState {
  selectedId?: string
  refreshedAt?: string
  loading: boolean
  error?: string
}

export const initialPaymentWorkspaceState: PaymentWorkspaceState = {
  loading: false,
}
