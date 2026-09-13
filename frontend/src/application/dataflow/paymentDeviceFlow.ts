export interface PaymentDeviceFlow {
  paymentId: string
  deviceIds: string[]
}

export function createPaymentDeviceFlow(
  paymentId: string,
  deviceIds: string[],
): PaymentDeviceFlow {
  return {
    paymentId,
    deviceIds: [...deviceIds],
  }
}
