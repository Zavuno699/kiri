export interface DashboardCachePolicy {
  ttlMs: number
  cacheable: boolean
}

export const dashboardCachePolicy: DashboardCachePolicy = {
  ttlMs: 30_000,
  cacheable: true,
}
