export interface PaymentRegistration {
  id: "payments"
  registered: boolean
  readOnly: boolean
}

export const paymentRegistration: PaymentRegistration = {
  id: "payments",
  registered: true,
  readOnly: true,
}
