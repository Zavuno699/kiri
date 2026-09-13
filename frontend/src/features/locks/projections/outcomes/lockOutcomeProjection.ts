export interface LockOutcomeProjection {
  operationId: string
  status:
    | "pending"
    | "success"
    | "failed"
    | "blocked"
  message?: string
  updatedAt: string
}
