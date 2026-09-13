export interface CommandOutcomeEvent {
  commandId: string
  domain: string
  state:
    | "accepted"
    | "completed"
    | "failed"
    | "blocked"
  message?: string
  occurredAt: string
}
