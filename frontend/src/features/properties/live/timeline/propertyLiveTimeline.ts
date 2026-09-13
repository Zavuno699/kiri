export interface PropertyLiveTimeline {
  id: string
  title: string
  type: string
  occurredAt: string
}

export function appendPropertyLiveTimeline(
  current: PropertyLiveTimeline[],
  item: PropertyLiveTimeline,
): PropertyLiveTimeline[] {
  return [
    item,
    ...current,
  ]
}
