import type { TimelineRecord } from "../timelineRecord"

export function groupTimelineByDomain(
  records: TimelineRecord[],
) {
  const groups = new Map<string, TimelineRecord[]>()

  for (const record of records) {
    const current =
      groups.get(record.domain) ?? []

    current.push(record)
    groups.set(record.domain, current)
  }

  return groups
}
