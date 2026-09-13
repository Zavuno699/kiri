export interface DashboardOutcome {
  commandId: string
  success: boolean
  state:
    | "completed"
    | "failed"
    | "blocked"
  message?: string
}
