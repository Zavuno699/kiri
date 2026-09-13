export interface DashboardLiveTimeline {
  id: string
  title: string
  type: string
  occurredAt: string
}

export function appendDashboardLiveTimeline(
  current: DashboardLiveTimeline[],
  item: DashboardLiveTimeline,
): DashboardLiveTimeline[] {
  return [
    item,
    ...current,
  ]
}
