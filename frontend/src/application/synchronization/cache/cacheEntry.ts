export interface CacheEntry<T> {
  key: string
  value: T
  version: number
  storedAt: string
  expiresAt?: string
}
