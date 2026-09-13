import {
  listSecurityAuditRecords,
} from "./securityAuditStore";

export function getSecurityDenialReasons() {
  const counts =
    new Map<
      string,
      number
    >();

  for (
    const record of listSecurityAuditRecords()
  ) {
    if (
      record.decision !==
      "deny"
    ) {
      continue;
    }

    counts.set(
      record.reason,
      (counts.get(
        record.reason,
      ) ?? 0) + 1,
    );
  }

  return [
    ...counts.entries(),
  ].map(
    ([reason, count]) => ({
      reason,
      count,
    }),
  );
}
