export interface RealtimeEvent<T = unknown> {
  eventId: string;
  eventType: string;
  version: number;
  occurredAt: string;
  correlationId: string | null;
  causationId: string | null;
  producer: string;
  domain: string;
  resourceKey: string;
  payload: T;
}
