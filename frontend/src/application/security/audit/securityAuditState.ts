
import type { SecurityAuditRecord } from "./auditRecord";

export interface SecurityAuditState {
  records: SecurityAuditRecord[];
  lastUpdatedAt: string | null;
}

