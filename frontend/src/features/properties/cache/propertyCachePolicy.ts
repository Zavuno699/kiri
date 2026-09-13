export interface PropertyCachePolicy {
  ttlMs: number
  cacheable: boolean
}

export const propertyCachePolicy: PropertyCachePolicy = {
  ttlMs: 30_000,
  cacheable: true,
}
