export interface OperationOutcome {
  operationId: string
  success: boolean
  state:
    | "completed"
    | "failed"
    | "blocked"
  message?: string
}
