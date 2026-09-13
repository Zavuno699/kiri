export interface PaymentLocalProjection {
  id: string
  version: number
  updatedAt: string
}

export function createPaymentLocalProjection(
  id: string,
): PaymentLocalProjection {
  return {
    id,
    version: 1,
    updatedAt: new Date().toISOString(),
  }
}
