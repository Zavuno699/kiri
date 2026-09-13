export type CanonicalRuntimeStatus =
  | "unknown"
  | "starting"
  | "ready"
  | "degraded"
  | "failed"
  | "stopped";

export interface CanonicalRuntimeState {
  initialized: boolean;
  status: CanonicalRuntimeStatus;
  startedAt: string | null;
  lastRefreshAt: string | null;
  reasons: string[];
}
