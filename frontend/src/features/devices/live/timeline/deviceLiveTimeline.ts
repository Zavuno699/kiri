export interface DeviceLiveTimeline {
  id: string
  title: string
  type: string
  occurredAt: string
}

export function appendDeviceLiveTimeline(
  current: DeviceLiveTimeline[],
  item: DeviceLiveTimeline,
): DeviceLiveTimeline[] {
  return [
    item,
    ...current,
  ]
}
