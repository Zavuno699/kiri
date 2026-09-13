export interface PaymentCommandState {
  running: boolean
  lastCommand?: string
  error?: string
}

export const initialPaymentCommandState: PaymentCommandState = {
  running: false,
}
