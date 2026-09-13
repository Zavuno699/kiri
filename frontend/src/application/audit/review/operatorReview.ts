import type { AuditEvent } from "../auditEvent";

export interface OperatorReview {
  principals: number;
  actions: number;
  deniedActions: number;
  latestActivityAt: string | null;
}

export function buildOperatorReview(
  events: AuditEvent[],
): OperatorReview {
  const principals = new Set(
    events
      .map((event) => event.principal)
      .filter(Boolean),
  );

  const operatorEvents = events.filter(
    (event) =>
      event.category === "operator" ||
      event.category === "authentication" ||
      event.category === "session",
  );

  const ordered = [...operatorEvents].sort(
    (left, right) =>
      Date.parse(right.occurredAt) -
      Date.parse(left.occurredAt),
  );

  return {
    principals: principals.size,
    actions: operatorEvents.length,
    deniedActions: operatorEvents.filter(
      (event) => event.outcome === "denied",
    ).length,
    latestActivityAt:
      ordered[0]?.occurredAt ?? null,
  };
}
