export interface CommandResultContract {
  commandId: string
  status:
    | "accepted"
    | "rejected"
    | "failed"
    | "completed"
  message?: string
  correlationId?: string
}
