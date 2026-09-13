import type { UnifiedTimelineModel } from "./UnifiedTimelineModel"

export function buildUnifiedTimeline(
  records: UnifiedTimelineModel["records"],
): UnifiedTimelineModel {
  const sorted = [...records].sort(
    (a, b) =>
      Date.parse(b.occurredAt) -
      Date.parse(a.occurredAt),
  )

  return {
    records: sorted,
    total: sorted.length,
  }
}
