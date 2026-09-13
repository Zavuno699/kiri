export interface PaymentLiveProjection {
  id: string
  status: string
  stale: boolean
  updatedAt: string
}

export function projectPaymentLive(
  id: string,
  status: string,
  stale = false,
): PaymentLiveProjection {
  return {
    id,
    status,
    stale,
    updatedAt:
      new Date().toISOString(),
  }
}
