export interface PaymentNavigation {
  label: string
  path: string
  enabled: boolean
}

export const paymentNavigation: PaymentNavigation = {
  label: "Payments",
  path: "/payments",
  enabled: true,
}
