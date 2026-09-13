export interface PropertyExecution {
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
