import type { RefreshRequest } from "./refreshRequest"

export interface RefreshQueue {
  request(value: RefreshRequest): void
  next(): RefreshRequest | undefined
  list(): RefreshRequest[]
}

export function createRefreshQueue(): RefreshQueue {
  const values: RefreshRequest[] = []

  return {
    request(value) {
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
