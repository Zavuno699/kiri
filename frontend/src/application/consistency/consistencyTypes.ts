export type ConsistencyStatus =
  | "unknown"
  | "consistent"
  | "warning"
  | "drifted"
  | "critical";

export type ConsistencySeverity =
  | "info"
  | "warning"
  | "error"
  | "critical";
