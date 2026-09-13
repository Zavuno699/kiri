export interface PaymentPageRefresh {
  refreshing: boolean
  requestedAt?: string
  completedAt?: string
}

export function initialPaymentPageRefresh():
  PaymentPageRefresh {
  return {
    refreshing: false,
  }
}
