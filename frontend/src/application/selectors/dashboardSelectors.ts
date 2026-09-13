export interface DashboardState {
  alerts: Array<{
    severity: string
  }>
  services: Array<{
    status: string
  }>
}

export function criticalAlertCount(
  state: DashboardState,
): number {
  return state.alerts.filter(
    (alert) =>
      alert.severity === "critical",
  ).length
}

export function unhealthyServiceCount(
  state: DashboardState,
): number {
  return state.services.filter(
    (service) =>
      service.status === "degraded" ||
      service.status === "offline",
  ).length
}
