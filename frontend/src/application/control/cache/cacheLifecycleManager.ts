export interface CacheResource<T = unknown> {
  key: string
  value: T
  createdAt: number
  expiresAt?: number
}

export interface CacheLifecycleManager {
  get<T>(key: string): CacheResource<T> | undefined
  set<T>(resource: CacheResource<T>): void
  delete(key: string): void
  clear(): void
}

const store = new Map<string, CacheResource<unknown>>()

export const cacheLifecycleManager: CacheLifecycleManager = {
  get<T>(key: string): CacheResource<T> | undefined {
    return store.get(key) as CacheResource<T> | undefined
  },

  set<T>(resource: CacheResource<T>): void {
    store.set(resource.key, resource as CacheResource<unknown>)
  },

  delete(key: string): void {
    store.delete(key)
  },

  clear(): void {
    store.clear()
  },
}
