import type {
  SecurityAuditRecord,
} from "../contracts/securityAuditRecord";

const records:
  SecurityAuditRecord[] = [];

export function recordSecurityAudit(
  record: SecurityAuditRecord,
): void {
  records.push(record);

  if (records.length > 500) {
    records.shift();
  }
}

export function listSecurityAuditRecords(): SecurityAuditRecord[] {
  return [
    ...records,
  ];
}
