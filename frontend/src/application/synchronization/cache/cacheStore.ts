import type { CacheEntry } from "./cacheEntry"

export interface CacheStore {
  set<T>(key: string, value: T): void
  get<T>(key: string): CacheEntry<T> | undefined
  remove(key: string): void
  clear(): void
}

export function createCacheStore(): CacheStore {
  const values = new Map<string, CacheEntry<unknown>>()

  return {
    set<T>(key, value) {
      values.set(key, {
        key,
        value,
        version:
          (values.get(key)?.version ?? 0) + 1,
        storedAt: new Date().toISOString(),
      })
    },

    get<T>(key) {
      return values.get(key) as
        | CacheEntry<T>
        | undefined
    },

    remove(key) {
      values.delete(key)
    },

    clear() {
      values.clear()
    },
  }
}
