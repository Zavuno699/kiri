export type CommandLifecycle =
  | "created"
  | "validated"
  | "authorized"
  | "dispatched"
  | "acknowledged"
  | "completed"
  | "failed"
  | "blocked"
