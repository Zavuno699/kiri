import {
  getMaterializedEntity,
  setMaterializedEntity,
} from "../materialized/materializedEntityStore";

export type ProjectionEvent<T = unknown> = {
  eventId: string;
  eventType: string;
  eventVersion: number;
  occurredAt: string;
  aggregateType: string;
  aggregateId: string;
  payload: T;
  correlationId?: string;
  causationId?: string;
  producer?: string;
};

export type ProjectedEntity = {
  domain: string;
  id: string;
  version: number;
  updatedAt: string;
  data: unknown;
};

export function projectEvent(
  domain: string,
  id: string,
  event: ProjectionEvent,
  data: unknown,
): ProjectedEntity {
  const current = getMaterializedEntity(domain, id);

  const next: ProjectedEntity = {
    domain,
    id,
    version: Math.max(current?.version ?? 0, event.eventVersion),
    updatedAt: event.occurredAt,
    data,
  };

  setMaterializedEntity(domain, id, next);

  return next;
}
