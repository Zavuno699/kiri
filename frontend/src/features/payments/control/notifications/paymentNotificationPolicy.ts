export interface PaymentNotificationPolicy {
  reportFailures: boolean
  reportBlocks: boolean
  reportSuccess: boolean
}

export const paymentNotificationPolicy:
  PaymentNotificationPolicy = {
  reportFailures: true,
  reportBlocks: true,
  reportSuccess: true,
}
