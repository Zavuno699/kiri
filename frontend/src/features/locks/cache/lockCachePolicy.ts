export interface LockCachePolicy {
  ttlMs: number
  cacheable: boolean
}

export const lockCachePolicy: LockCachePolicy = {
  ttlMs: 30_000,
  cacheable: true,
}
