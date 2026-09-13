export interface DashboardPageViewModel {
  ready: boolean
  empty: boolean
  degraded: boolean
  data?: unknown
}

export function presentDashboardPage(
  value: {
    lifecycle: string
    data?: unknown
  },
): DashboardPageViewModel {
  return {
    ready:
      value.lifecycle === "ready",
    empty:
      value.data === undefined ||
      (
        Array.isArray(value.data) &&
        value.data.length === 0
      ),
    degraded:
      value.lifecycle === "degraded" ||
      value.lifecycle === "error",
    data: value.data,
  }
}
