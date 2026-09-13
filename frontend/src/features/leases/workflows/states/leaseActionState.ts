export type LeaseActionState =
  | "idle"
  | "prepared"
  | "authorized"
  | "confirmed"
  | "executing"
  | "completed"
  | "failed"
  | "blocked"
