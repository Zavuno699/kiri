export interface LeaseLiveTimeline {
  id: string
  title: string
  type: string
  occurredAt: string
}

export function appendLeaseLiveTimeline(
  current: LeaseLiveTimeline[],
  item: LeaseLiveTimeline,
): LeaseLiveTimeline[] {
  return [
    item,
    ...current,
  ]
}
