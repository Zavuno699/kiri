import type {
  AuditRecord,
} from "../contracts/auditRecord";

const records: AuditRecord[] = [];

export function appendAuditRecord(
  record: AuditRecord,
): void {
  records.unshift(
    record,
  );
}

export function listAuditRecords(): AuditRecord[] {
  return [
    ...records,
  ];
}

export function findAuditRecordsByCorrelationId(
  correlationId: string,
): AuditRecord[] {
  return records.filter(
    (record) =>
      record.correlationId ===
      correlationId,
  );
}

export function findAuditRecordsByEntityId(
  entityId: string,
): AuditRecord[] {
  return records.filter(
    (record) =>
      record.entityId ===
      entityId,
  );
}

export function getAuditRecord(
  id: string,
): AuditRecord | null {
  return (
    records.find(
      (record) =>
        record.id ===
        id,
    ) ??
    null
  );
}
