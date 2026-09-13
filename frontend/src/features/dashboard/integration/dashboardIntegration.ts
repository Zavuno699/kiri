import {
  presentDashboard,
} from "../presenters/dashboardPresenter"

export function integrateDashboard(
  raw: {
    serviceCount: number
    criticalAlertCount: number
    degradedServiceCount: number
  },
) {
  return presentDashboard(raw)
}
