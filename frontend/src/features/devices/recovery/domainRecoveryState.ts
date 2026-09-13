export interface DevicesRecoveryState {
  status: "idle" | "recovering" | "recovered" | "degraded" | "failed";
  reason: string | null;
  lastAttemptAt: string | null;
}
