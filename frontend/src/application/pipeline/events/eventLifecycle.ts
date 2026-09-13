export type EventLifecycle =
  | "received"
  | "decoded"
  | "validated"
  | "correlated"
  | "projected"
  | "published"
  | "completed"
  | "rejected"
