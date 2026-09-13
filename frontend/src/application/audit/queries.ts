import type { AuditEvent } from "./auditEvent";

export interface AuditQuery {
  category?: AuditEvent["category"];
  outcome?: AuditEvent["outcome"];
  principal?: string | null;
  capability?: string | null;
  resourceType?: string | null;
  resourceId?: string | null;
  from?: string;
  to?: string;
  limit?: number;
}

export function queryAuditEvents(
  events: AuditEvent[],
  query: AuditQuery,
): AuditEvent[] {
  let result = [...events];

  if (query.category) {
    result = result.filter(
      (event) => event.category === query.category,
    );
  }

  if (query.outcome) {
    result = result.filter(
      (event) => event.outcome === query.outcome,
    );
  }

  if (query.principal) {
    result = result.filter(
      (event) => event.principal === query.principal,
    );
  }

  if (query.capability) {
    result = result.filter(
      (event) => event.capability === query.capability,
    );
  }

  if (query.resourceType) {
    result = result.filter(
      (event) => event.resourceType === query.resourceType,
    );
  }

  if (query.resourceId) {
    result = result.filter(
      (event) => event.resourceId === query.resourceId,
    );
  }

  if (query.from) {
    const from = Date.parse(query.from);
    result = result.filter(
      (event) => Date.parse(event.occurredAt) >= from,
    );
  }

  if (query.to) {
    const to = Date.parse(query.to);
    result = result.filter(
      (event) => Date.parse(event.occurredAt) <= to,
    );
  }

  result.sort(
    (left, right) =>
      Date.parse(right.occurredAt) -
      Date.parse(left.occurredAt),
  );

  if (query.limit && query.limit > 0) {
    return result.slice(0, query.limit);
  }

  return result;
}
