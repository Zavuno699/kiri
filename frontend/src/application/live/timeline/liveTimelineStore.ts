import type { LiveTimelineEntry } from "./liveTimelineEntry"

export interface LiveTimelineStore {
  append(value: LiveTimelineEntry): void
  list(domain?: string): LiveTimelineEntry[]
}

export function createLiveTimelineStore():
  LiveTimelineStore {
  const values: LiveTimelineEntry[] = []

  return {
    append(value) {
      values.unshift(value)
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
