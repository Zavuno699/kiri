
import type { SecurityAuditRecord } from "./auditRecord";

const records: SecurityAuditRecord[] = [];

export function recordSecurityAudit(
  record: SecurityAuditRecord,
): void {
  records.push(record);
}

export function listSecurityAuditRecords(): SecurityAuditRecord[] {
  return [...records];
}

