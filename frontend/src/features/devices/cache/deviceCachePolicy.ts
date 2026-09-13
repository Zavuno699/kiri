export interface DeviceCachePolicy {
  ttlMs: number
  cacheable: boolean
}

export const deviceCachePolicy: DeviceCachePolicy = {
  ttlMs: 30_000,
  cacheable: true,
}
