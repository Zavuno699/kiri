import type {
  CacheAdapter,
  CacheEntry,
} from "./cacheTypes"

export class MemoryCache implements CacheAdapter {
  private readonly entries = new Map<
    string,
    CacheEntry<unknown>
  >()

  get<T>(key: string): T | undefined {
    const entry = this.entries.get(key)

    if (!entry) return undefined

    if (
      entry.expiresAt != null &&
      Date.now() >= entry.expiresAt
    ) {
      this.entries.delete(key)
      return undefined
    }

    return entry.value as T
  }

  set<T>(
    key: string,
    value: T,
    ttlMs?: number,
  ): void {
    this.entries.set(key, {
      value,
      storedAt: Date.now(),
      expiresAt:
        ttlMs == null
          ? undefined
          : Date.now() + ttlMs,
    })
  }

  delete(key: string): void {
    this.entries.delete(key)
  }

  clear(): void {
    this.entries.clear()
  }

  has(key: string): boolean {
    return this.get(key) !== undefined
  }
}

export const memoryCache =
  new MemoryCache()
