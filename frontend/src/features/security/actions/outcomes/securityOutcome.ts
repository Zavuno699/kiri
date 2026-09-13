export interface SecurityOutcome {
  commandId: string
  success: boolean
  state:
    | "completed"
    | "failed"
    | "blocked"
  message?: string
}
