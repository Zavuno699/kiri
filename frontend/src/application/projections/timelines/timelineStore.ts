import type { TimelineEntry } from "./timelineEntry"

export interface TimelineStore {
  append(entry: TimelineEntry): void
  list(domain?: string): TimelineEntry[]
}

export function createTimelineStore(): TimelineStore {
  const values: TimelineEntry[] = []

  return {
    append(entry) {
      values.push(entry)
    },

    list(domain) {
      return domain
        ? values.filter(
            (item) => item.domain === domain,
          )
        : [...values]
    },
  }
}
