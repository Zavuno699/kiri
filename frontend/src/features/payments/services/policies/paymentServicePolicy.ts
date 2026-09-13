export interface PaymentServicePolicy {
  readable: boolean
  refreshable: boolean
  commandable: boolean
}

export const paymentServicePolicy:
  PaymentServicePolicy = {
  readable: true,
  refreshable: true,
  commandable: true,
}
