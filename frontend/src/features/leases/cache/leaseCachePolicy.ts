export interface LeaseCachePolicy {
  ttlMs: number
  cacheable: boolean
}

export const leaseCachePolicy: LeaseCachePolicy = {
  ttlMs: 30_000,
  cacheable: true,
}
