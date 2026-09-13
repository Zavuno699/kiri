export type PaymentState =
  | "unknown"
  | "loading"
  | "active"
  | "degraded"
  | "blocked"
  | "failed"
  | "completed"
