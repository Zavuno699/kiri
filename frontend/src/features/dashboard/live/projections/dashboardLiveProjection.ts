export interface DashboardLiveProjection {
  healthyServices: number
  degradedServices: number
  criticalEvents: number
  recentEvents: number
  updatedAt: string
}

export const initialDashboardLiveProjection:
  DashboardLiveProjection = {
  healthyServices: 0,
  degradedServices: 0,
  criticalEvents: 0,
  recentEvents: 0,
  updatedAt:
    new Date().toISOString(),
}
