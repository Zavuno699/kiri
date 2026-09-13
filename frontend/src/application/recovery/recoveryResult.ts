import type { RecoveryStatus } from "./recoveryTypes";

export interface RecoveryResult {
  status: RecoveryStatus;
  scope: string;
  recovered: boolean;
  reason: string;
  attemptedAt: string;
  completedAt: string | null;
}
