import {
  listAuditRecords,
} from "../audit/auditStore";

export function selectAuditTimeline(
  domain?: string,
) {
  return listAuditRecords().filter(
    (record) =>
      !domain ||
      record.domain ===
        domain,
  );
}
