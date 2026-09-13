export type RecoveryStatus =
  | "idle"
  | "prepared"
  | "executing"
  | "verifying"
  | "completed"
  | "failed"
  | "aborted";

export interface RecoveryOperation {
  id: string;
  incidentId: string | null;
  domain: string;
  action: string;
  status: RecoveryStatus;
  startedAt: string | null;
  completedAt: string | null;
  reason: string | null;
}
