export interface DashboardConsistencyState {
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
