export interface DashboardPageEvent {
  type:
    | "dashboard.page.loaded"
    | "dashboard.page.refreshed"
    | "dashboard.page.failed"
  occurredAt: string
}
