export interface CommandExecution {
  commandId: string
  state:
    | "pending"
    | "running"
    | "completed"
    | "failed"
    | "blocked"
  startedAt?: string
  completedAt?: string
  error?: string
}
