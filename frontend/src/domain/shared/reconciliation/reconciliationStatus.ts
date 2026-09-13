export type ReconciliationStatus =
  | "healthy"
  | "refreshing"
  | "stale"
  | "diverged"
  | "missing";
