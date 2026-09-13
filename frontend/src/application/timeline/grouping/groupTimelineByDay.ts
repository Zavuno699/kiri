import type { TimelineRecord } from "../timelineRecord"

export function groupTimelineByDay(
  records: TimelineRecord[],
) {
  const groups = new Map<string, TimelineRecord[]>()

  for (const record of records) {
    const key = record.occurredAt.slice(0, 10)
    const current = groups.get(key) ?? []
    current.push(record)
    groups.set(key, current)
  }

  return groups
}
