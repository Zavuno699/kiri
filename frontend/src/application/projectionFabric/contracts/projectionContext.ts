export interface ProjectionContext {
  projectionId: string;
  eventId: string;
  eventType: string;
  entityId: string | null;
  domain: string;
  correlationId: string | null;
  occurredAt: string;
  payload: Record<string, unknown>;
}
