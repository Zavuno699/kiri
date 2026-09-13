import { getDashboardAccessState } from "./dashboardAccessState"

export function canReadDashboard(): boolean {
  return getDashboardAccessState().readable
}

export function canWriteDashboard(): boolean {
  return getDashboardAccessState().writable
}
