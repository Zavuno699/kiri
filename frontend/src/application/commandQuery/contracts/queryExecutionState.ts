export interface QueryExecutionState {
  activeQueryId: string | null;
  entityId: string | null;
  status:
    | "idle"
    | "pending"
    | "completed"
    | "failed";
  message: string | null;
  startedAt: string | null;
  completedAt: string | null;
  durationMs: number | null;
}
