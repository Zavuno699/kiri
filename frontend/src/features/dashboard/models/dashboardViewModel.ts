export interface DashboardViewModel {
  title: string
  serviceCount: number
  criticalAlertCount: number
  degradedServiceCount: number
  operational: boolean
}

export function buildDashboardViewModel(
  serviceCount: number,
  criticalAlertCount: number,
  degradedServiceCount: number,
): DashboardViewModel {
  return {
    title: "Operations",
    serviceCount,
    criticalAlertCount,
    degradedServiceCount,
    operational:
      criticalAlertCount === 0 &&
      degradedServiceCount === 0,
  }
}
