export interface PaymentCompensation {
  available: boolean
  steps: string[]
}

export const paymentCompensation:
  PaymentCompensation = {
  available: false,
  steps: [],
}
