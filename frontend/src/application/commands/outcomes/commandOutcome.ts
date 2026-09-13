export interface CommandOutcome {
  commandId: string
  accepted: boolean
  state:
    | "accepted"
    | "completed"
    | "failed"
    | "blocked"
  message?: string
  correlationId?: string
}
