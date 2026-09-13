export interface PaymentAvailability {
  available: boolean
  reason?: string
}

export function paymentAvailable(): PaymentAvailability {
  return {
    available: true,
  }
}
