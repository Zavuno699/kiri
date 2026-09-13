export interface SecurityLiveTimeline {
  id: string
  title: string
  type: string
  occurredAt: string
}

export function appendSecurityLiveTimeline(
  current: SecurityLiveTimeline[],
  item: SecurityLiveTimeline,
): SecurityLiveTimeline[] {
  return [
    item,
    ...current,
  ]
}
