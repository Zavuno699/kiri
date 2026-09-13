export interface LockLiveTimeline {
  id: string
  title: string
  type: string
  occurredAt: string
}

export function appendLockLiveTimeline(
  current: LockLiveTimeline[],
  item: LockLiveTimeline,
): LockLiveTimeline[] {
  return [
    item,
    ...current,
  ]
}
