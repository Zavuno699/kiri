export interface LeaseOutcome {
  commandId: string
  success: boolean
  state:
    | "completed"
    | "failed"
    | "blocked"
  message?: string
}
