import type { RecoveryScope } from "../recoveryTypes";

export interface RecoveryEvent {
  type:
    | "recovery.started"
    | "recovery.completed"
    | "recovery.failed"
    | "recovery.degraded";
  scope: RecoveryScope;
  occurredAt: string;
  reason: string;
  resourceId?: string | null;
}
