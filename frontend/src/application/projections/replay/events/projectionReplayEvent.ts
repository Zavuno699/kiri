export type ProjectionReplayEvent<T = unknown> = {
  eventId: string;
  eventType: string;
  eventVersion: number;
  aggregateType: string;
  aggregateId: string;
  occurredAt: string;
  sequence: number;
  payload: T;
  correlationId?: string;
  causationId?: string;
  producer?: string;
};
