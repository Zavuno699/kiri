import type { LiveInvalidation } from "./liveInvalidation"

export interface LiveInvalidationManager {
  invalidate(
    key: string,
    domain: string,
    reason: string,
  ): void

  consume(
    key: string,
  ): LiveInvalidation | undefined

  list(): LiveInvalidation[]
}

export function createLiveInvalidationManager():
  LiveInvalidationManager {
  const values =
    new Map<string, LiveInvalidation>()

  return {
    invalidate(key, domain, reason) {
      values.set(key, {
        key,
        domain,
        reason,
        occurredAt:
          new Date().toISOString(),
      })
    },

    consume(key) {
      const value = values.get(key)
      values.delete(key)
      return value
    },

    list() {
      return [...values.values()]
    },
  }
}
