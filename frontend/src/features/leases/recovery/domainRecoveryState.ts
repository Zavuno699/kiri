export interface LeasesRecoveryState {
  status: "idle" | "recovering" | "recovered" | "degraded" | "failed";
  reason: string | null;
  lastAttemptAt: string | null;
}
