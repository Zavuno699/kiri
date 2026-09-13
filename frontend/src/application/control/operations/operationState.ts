export type OperationState =
  | "created"
  | "queued"
  | "running"
  | "awaiting"
  | "completed"
  | "failed"
  | "blocked"
  | "cancelled"
