export type SecurityActionState =
  | "idle"
  | "prepared"
  | "authorized"
  | "confirmed"
  | "executing"
  | "completed"
  | "failed"
  | "blocked"
