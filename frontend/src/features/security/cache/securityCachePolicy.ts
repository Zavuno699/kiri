export interface SecurityCachePolicy {
  ttlMs: number
  cacheable: boolean
}

export const securityCachePolicy: SecurityCachePolicy = {
  ttlMs: 30_000,
  cacheable: true,
}
