import type { LiveResourceState } from "./liveResourceState"

export interface LiveResourceStore {
  get<T>(
    key: string,
  ): LiveResourceState<T> | undefined

  set<T>(
    key: string,
    value: LiveResourceState<T>,
  ): void

  patch(
    key: string,
    value: Partial<LiveResourceState>,
  ): void

  list(): LiveResourceState[]
}

export function createLiveResourceStore():
  LiveResourceStore {
  const values =
    new Map<string, LiveResourceState>()

  return {
    get(key) {
      return values.get(key)
    },

    set(key, value) {
      values.set(key, value)
    },

    patch(key, patch) {
      const current = values.get(key)

      if (!current) {
        return
      }

      values.set(key, {
        ...current,
        ...patch,
        version:
          current.version + 1,
      })
    },

    list() {
      return [...values.values()]
    },
  }
}
