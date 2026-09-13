import { getDashboard } from "../../api/resources/dashboardResource"

export interface DashboardCoordinator {
  load<T>(): Promise<T>
}

export function createDashboardCoordinator():
  DashboardCoordinator {
  return {
    load: getDashboard,
  }
}
