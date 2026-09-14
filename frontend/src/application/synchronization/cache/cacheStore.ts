import type { CacheEntry } from "./cacheEntry"

export interface CacheStore {
  set(key: string, value: unknown): void
  get(key: string): CacheEntry<unknown> | undefined
  remove(key: string): void
  clear(): void
}

export function createCacheStore(): CacheStore {
  const values = new Map<string, CacheEntry<unknown>>()

  return {
    set(key: string, value: unknown) {
      values.set(key, {
        key,
        value,
        version:
          (values.get(key)?.version ?? 0) + 1,
        storedAt: new Date().toISOString(),
      })
    },

    get(key: string) {
      return values.get(key) as
        | CacheEntry<unknown>
        | undefined
    },

    remove(key: string) {
      values.delete(key)
    },

    clear() {
      values.clear()
    },
  }
}
