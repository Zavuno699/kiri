import type { TimelineRecord } from "./timelineRecord"

export interface TimelineCollection {
  records: TimelineRecord[]
  total: number
}

export function createTimelineCollection(
  records: TimelineRecord[],
): TimelineCollection {
  return {
    records: [...records],
    total: records.length,
  }
}
