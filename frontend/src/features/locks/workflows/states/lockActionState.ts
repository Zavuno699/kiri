export type LockActionState =
  | "idle"
  | "prepared"
  | "authorized"
  | "confirmed"
  | "executing"
  | "completed"
  | "failed"
  | "blocked"
