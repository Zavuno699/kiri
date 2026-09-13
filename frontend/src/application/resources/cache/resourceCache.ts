export interface ResourceCacheEntry<T = unknown> {
  value: T
  expiresAt?: number
}

const cache = new Map<string, ResourceCacheEntry<unknown>>()

export const resourceCache = {
  get<T>(key: string): ResourceCacheEntry<T> | undefined {
    return cache.get(key) as ResourceCacheEntry<T> | undefined
  },

  set<T>(key: string, entry: ResourceCacheEntry<T>): void {
    cache.set(key, entry as ResourceCacheEntry<unknown>)
  },

  remove(key: string): void {
    cache.delete(key)
  },

  clear(): void {
    cache.clear()
  },
}
