export type PaymentActionState =
  | "idle"
  | "prepared"
  | "authorized"
  | "confirmed"
  | "executing"
  | "completed"
  | "failed"
  | "blocked"
