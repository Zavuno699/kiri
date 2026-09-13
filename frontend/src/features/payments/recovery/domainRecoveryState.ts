export interface PaymentsRecoveryState {
  status: "idle" | "recovering" | "recovered" | "degraded" | "failed";
  reason: string | null;
  lastAttemptAt: string | null;
}
