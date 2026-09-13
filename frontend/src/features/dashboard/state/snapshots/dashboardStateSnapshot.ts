import type { DashboardState } from "../dashboardState"

export interface DashboardStateSnapshot {
  state: DashboardState
  version: number
  updatedAt: string
  reason?: string
}
