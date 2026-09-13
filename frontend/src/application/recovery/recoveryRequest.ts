import type { RecoveryScope } from "./recoveryTypes";

export interface RecoveryRequest {
  scope: RecoveryScope;
  reason: string;
  resourceType?: string | null;
  resourceId?: string | null;
  correlationId?: string | null;
}
