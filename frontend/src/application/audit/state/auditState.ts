import type { AuditEvent } from "../auditEvent";

export interface AuditState {
  initialized: boolean;
  events: AuditEvent[];
  loading: boolean;
  error: string | null;
  lastUpdatedAt: string | null;
}
