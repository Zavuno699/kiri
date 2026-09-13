export interface LeaseExecution {
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
