import type { LiveRefreshRequest } from "./liveRefreshRequest"

export interface LiveRefreshQueue {
  enqueue(value: LiveRefreshRequest): void
  next(): LiveRefreshRequest | undefined
  list(): LiveRefreshRequest[]
}

export function createLiveRefreshQueue():
  LiveRefreshQueue {
  const values: LiveRefreshRequest[] = []

  return {
    enqueue(value) {
      if (
        values.some(
          (item) => item.key === value.key,
        )
      ) {
        return
      }

      values.push(value)
    },

    next() {
      return values.shift()
    },

    list() {
      return [...values]
    },
  }
}
