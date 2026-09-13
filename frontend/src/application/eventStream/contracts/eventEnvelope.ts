export interface EventEnvelope<T = unknown> {
  eventId: string;
  eventType: string;
  eventVersion: number;
  occurredAt: string;
  producer: string;
  correlationId: string | null;
  causationId: string | null;
  aggregateId: string | null;
  aggregateType: string | null;
  domain: string;
  payload: T;
}
