import type {
  DashboardSnapshot,
} from "../types/dashboard"
import type {
  DashboardMetric,
} from "../types/dashboardMetric"
import type {
  DashboardServiceStatus,
} from "../types/dashboardService"

export interface DashboardProjection {
  metrics: DashboardMetric[]
  services: DashboardServiceStatus[]
}

export function projectDashboard(
  snapshot?: DashboardSnapshot,
): DashboardProjection {
  if (!snapshot) {
    return {
      metrics: [],
      services: [],
    }
  }

  return {
    metrics: [],
    services: [],
  }
}
