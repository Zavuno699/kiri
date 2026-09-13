import type { LiveSyncRecord } from "./liveSyncRecord"

export interface LiveSyncManager {
  get(
    key: string,
  ): LiveSyncRecord | undefined

  set(value: LiveSyncRecord): void

  markStale(key: string): void
  markSynced(key: string): void

  list(domain?: string): LiveSyncRecord[]
}

export function createLiveSyncManager():
  LiveSyncManager {
  const values =
    new Map<string, LiveSyncRecord>()

  return {
    get(key) {
      return values.get(key)
    },

    set(value) {
      values.set(value.key, value)
    },

    markStale(key) {
      const current = values.get(key)

      if (current) {
        values.set(key, {
          ...current,
          state: "stale",
          version:
            current.version + 1,
          updatedAt:
            new Date().toISOString(),
        })
      }
    },

    markSynced(key) {
      const current = values.get(key)

      if (current) {
        values.set(key, {
          ...current,
          state: "synced",
          version:
            current.version + 1,
          updatedAt:
            new Date().toISOString(),
        })
      }
    },

    list(domain) {
      const all = [...values.values()]

      return domain
        ? all.filter(
            (item) => item.domain === domain,
          )
        : all
    },
  }
}
