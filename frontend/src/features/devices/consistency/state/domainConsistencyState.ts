export interface DevicesConsistencyState {
  status:
    | "unknown"
    | "consistent"
    | "warning"
    | "drifted"
    | "critical";
  score: number;
  reason: string | null;
  checkedAt: string | null;
}
