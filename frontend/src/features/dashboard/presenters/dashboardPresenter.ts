import {
  buildDashboardViewModel,
} from "../models/dashboardViewModel"

export function presentDashboard(
  input: {
    serviceCount: number
    criticalAlertCount: number
    degradedServiceCount: number
  },
) {
  return buildDashboardViewModel(
    input.serviceCount,
    input.criticalAlertCount,
    input.degradedServiceCount,
  )
}
