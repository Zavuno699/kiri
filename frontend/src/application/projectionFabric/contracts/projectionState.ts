export interface ProjectionState {
  activeProjectionId: string | null;
  lastEventId: string | null;
  lastResult:
    | "success"
    | "failed"
    | "skipped"
    | null;
  processedCount: number;
  failedCount: number;
  staleCount: number;
  loading: boolean;
  error: string | null;
}
