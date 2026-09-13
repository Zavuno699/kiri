import type { AuditEvent } from "../auditEvent";
import type { AuditRetentionPolicy } from "./auditRetentionPolicy";

export function pruneAuditEvents(
  events: AuditEvent[],
  policy: AuditRetentionPolicy,
  now = Date.now(),
): AuditEvent[] {
  const minimumTime =
    now - policy.maxAgeDays * 24 * 60 * 60 * 1000;

  const ageFiltered = events.filter(
    (event) =>
      Date.parse(event.occurredAt) >= minimumTime,
  );

  return ageFiltered
    .sort(
      (left, right) =>
        Date.parse(right.occurredAt) -
        Date.parse(left.occurredAt),
    )
    .slice(0, policy.maxEvents);
}
