import type { RecoveryStatus } from "../recoveryTypes";

export interface RecoveryState {
  status: RecoveryStatus;
  activeScope: string | null;
  activeResourceId: string | null;
  attempts: number;
  lastAttemptAt: string | null;
  lastCompletedAt: string | null;
  lastReason: string | null;
  error: string | null;
}
