export interface PaymentRuntime {
  domain: "payments"
  started: boolean
  readOnly: boolean
}

export const paymentRuntime: PaymentRuntime = {
  domain: "payments",
  started: false,
  readOnly: true,
}
