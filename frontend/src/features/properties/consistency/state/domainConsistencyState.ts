export interface PropertiesConsistencyState {
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
