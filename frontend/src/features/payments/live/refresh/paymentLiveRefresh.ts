export interface PaymentLiveRefresh {
  requested: boolean
  running: boolean
  completed: boolean
  failed: boolean
}

export const initialPaymentLiveRefresh:
  PaymentLiveRefresh = {
  requested: false,
  running: false,
  completed: false,
  failed: false,
}
