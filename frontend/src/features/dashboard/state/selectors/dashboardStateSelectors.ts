import type { DashboardState } from "../dashboardState"

export function dashboardIsOperational(
  state: DashboardState,
): boolean {
  return state === "active"
}

export function dashboardIsDegraded(
  state: DashboardState,
): boolean {
  return state === "degraded"
}

export function dashboardIsBlocked(
  state: DashboardState,
): boolean {
  return state === "blocked"
}

export function dashboardIsFailed(
  state: DashboardState,
): boolean {
  return state === "failed"
}
