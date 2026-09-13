export interface CommandReconciliationState {
  commandId: string;
  status:
    | "unknown"
    | "pending"
    | "accepted"
    | "rejected"
    | "completed"
    | "failed"
    | "timeout"
    | "drifted";
  requestedAt: string;
  observedAt: string | null;
  reason: string | null;
}
