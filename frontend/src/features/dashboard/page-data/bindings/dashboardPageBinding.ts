export interface DashboardPageBinding<T = unknown> {
  pageId: string
  domain: "dashboard"
  route: string
  data?: T
  loading: boolean
  error?: string
}

export function createDashboardPageBinding<T>(
  pageId: string,
  route: string,
): DashboardPageBinding<T> {
  return {
    pageId,
    domain: "dashboard",
    route,
    loading: false,
  }
}
