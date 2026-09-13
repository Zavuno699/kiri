import type { CacheLifecycle } from "./cacheLifecycle"

export interface CacheResource<T = unknown> {
  key: string
  lifecycle: CacheLifecycle
  value?: T
  version: number
  storedAt?: string
  expiresAt?: string
}
