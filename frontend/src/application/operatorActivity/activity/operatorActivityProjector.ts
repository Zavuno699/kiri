import type { AuditEvent } from "../../audit/auditEvent";
import type { OperatorActivityItem } from "./operatorActivityItem";

export function projectOperatorActivity(
  events: AuditEvent[],
): OperatorActivityItem[] {
  return events
    .filter(
      (event) =>
        event.category === "operator" ||
        event.category === "authentication" ||
        event.category === "session" ||
        event.category === "authorization" ||
        event.category === "command",
    )
    .map((event) => ({
      id: event.id,
      principal: event.principal,
      action: event.action,
      category: event.category,
      outcome: event.outcome,
      occurredAt: event.occurredAt,
      capability: event.capability ?? null,
      resourceType: event.resourceType ?? null,
      resourceId: event.resourceId ?? null,
      correlationId: event.correlationId ?? null,
    }))
    .sort(
      (left, right) =>
        Date.parse(right.occurredAt) -
        Date.parse(left.occurredAt),
    );
}
