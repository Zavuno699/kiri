export interface ResourceCacheEntry<T = unknown> {
  key: string
  data: T
  version: number
  storedAt: string
  expiresAt?: string
}
