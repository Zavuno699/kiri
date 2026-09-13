import type { CommandQueueEntry } from "./commandQueueEntry"

export interface CommandQueue {
  enqueue<T>(
    entry: CommandQueueEntry<T>,
  ): void

  next(): CommandQueueEntry | undefined

  list(): CommandQueueEntry[]
}

export function createCommandQueue(): CommandQueue {
  const values: CommandQueueEntry[] = []

  return {
    enqueue(entry) {
      values.push(entry)
    },

    next() {
      return values.find(
        (item) => item.state === "queued",
      )
    },

    list() {
      return [...values]
    },
  }
}
