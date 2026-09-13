export type ReconciliationState =
  | "idle"
  | "matched"
  | "mismatch"
  | "pending"
  | "resolved"
  | "blocked"
