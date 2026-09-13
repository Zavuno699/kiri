export type DashboardRefreshStep =
  | "prepare"
  | "load"
  | "project"
  | "complete"

export interface DashboardRefreshState {
  step: DashboardRefreshStep
  startedAt?: string
  completedAt?: string
  error?: string
}
