export interface DashboardLiveInvalidation {
  key: string
  reason: string
  occurredAt: string
}

export function createDashboardLiveInvalidation(
  key: string,
  reason: string,
): DashboardLiveInvalidation {
  return {
    key,
    reason,
    occurredAt:
      new Date().toISOString(),
  }
}
