import type { InvalidationRecord } from "./invalidationRecord"

export interface InvalidationManager {
  invalidate(
    key: string,
    reason: InvalidationRecord["reason"],
  ): void

  list(): InvalidationRecord[]

  consume(key: string): InvalidationRecord | undefined
}

export function createInvalidationManager():
  InvalidationManager {
  const values = new Map<string, InvalidationRecord>()

  return {
    invalidate(key, reason) {
      values.set(key, {
        key,
        reason,
        occurredAt: new Date().toISOString(),
      })
    },

    list() {
      return [...values.values()]
    },

    consume(key) {
      const value = values.get(key)

      if (value) {
        values.delete(key)
      }

      return value
    },
  }
}
