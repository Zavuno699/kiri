import type { TimelineRecord } from "../timelineRecord"

export interface TimelineBuilder {
  add(record: TimelineRecord): void
  build(): TimelineRecord[]
}

export function createTimelineBuilder(): TimelineBuilder {
  const records: TimelineRecord[] = []

  return {
    add(record) {
      records.push(record)
    },

    build() {
      return [...records].sort(
        (a, b) =>
          Date.parse(b.occurredAt) -
          Date.parse(a.occurredAt),
      )
    },
  }
}
