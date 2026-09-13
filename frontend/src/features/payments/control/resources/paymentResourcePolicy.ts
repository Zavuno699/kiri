export interface PaymentResourcePolicy {
  cacheable: boolean
  refreshable: boolean
  commandable: boolean
}

export const paymentResourcePolicy:
  PaymentResourcePolicy = {
  cacheable: true,
  refreshable: true,
  commandable: true,
}
