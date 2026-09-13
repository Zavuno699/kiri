export interface LocksReconciliationState {
  status:
    | "unknown"
    | "consistent"
    | "drifted"
    | "stale"
    | "missing"
    | "conflicted"
    | "reconciling"
    | "failed";
  conflicts: string[];
  checkedAt: string | null;
}
