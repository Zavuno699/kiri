import type { UnifiedActivityModel } from "./UnifiedActivityModel"

export function buildUnifiedActivity(
  records: UnifiedActivityModel["records"],
): UnifiedActivityModel {
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
