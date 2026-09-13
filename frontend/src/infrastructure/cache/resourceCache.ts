import {
  memoryCache,
} from "./memoryCache"

export interface ResourceCacheOptions {
  ttlMs?: number
}

export async function cachedResource<T>(
  key: string,
  loader: () => Promise<T>,
  options: ResourceCacheOptions = {},
): Promise<T> {
  const cached = memoryCache.get<T>(key)

  if (cached !== undefined) {
    return cached
  }

  const value = await loader()

  memoryCache.set(
    key,
    value,
    options.ttlMs,
  )

  return value
}

export function invalidateResource(
  key: string,
): void {
  memoryCache.delete(key)
}
