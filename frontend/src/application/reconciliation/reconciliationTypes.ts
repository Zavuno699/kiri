export type ReconciliationStatus =
  | "unknown"
  | "consistent"
  | "drifted"
  | "stale"
  | "missing"
  | "conflicted"
  | "reconciling"
  | "failed";
