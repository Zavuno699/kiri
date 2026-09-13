export interface PaymentCachePolicy {
  ttlMs: number
  cacheable: boolean
}

export const paymentCachePolicy: PaymentCachePolicy = {
  ttlMs: 30_000,
  cacheable: true,
}
