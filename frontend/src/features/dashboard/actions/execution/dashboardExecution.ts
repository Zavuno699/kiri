export interface DashboardExecution {
  commandId: string
  state:
    | "idle"
    | "pending"
    | "running"
    | "completed"
    | "failed"
    | "blocked"
  progress: number
  error?: string
}
