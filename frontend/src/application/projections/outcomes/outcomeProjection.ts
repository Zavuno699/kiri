export interface OutcomeProjection {
  id: string
  status:
    | "pending"
    | "accepted"
    | "completed"
    | "failed"
    | "blocked"
  message?: string
  updatedAt: string
}
