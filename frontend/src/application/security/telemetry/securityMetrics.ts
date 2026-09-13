import {
  listSecurityAuditRecords,
} from "./securityAuditStore";

export function getSecurityMetrics() {
  const records =
    listSecurityAuditRecords();

  return {
    total:
      records.length,

    allowed:
      records.filter(
        (record) =>
          record.decision ===
          "allow",
      ).length,

    denied:
      records.filter(
        (record) =>
          record.decision ===
          "deny",
      ).length,

    frozen:
      records.filter(
        (record) =>
          record.decision ===
          "freeze",
      ).length,

    challenged:
      records.filter(
        (record) =>
          record.decision ===
          "challenge",
      ).length,
  };
}
