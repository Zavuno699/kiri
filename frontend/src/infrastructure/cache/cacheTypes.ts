export interface CacheEntry<T> {
  value: T
  storedAt: number
  expiresAt?: number
}

export interface CacheAdapter {
  get<T>(key: string): T | undefined
  set<T>(key: string, value: T, ttlMs?: number): void
  delete(key: string): void
  clear(): void
  has(key: string): boolean
}
