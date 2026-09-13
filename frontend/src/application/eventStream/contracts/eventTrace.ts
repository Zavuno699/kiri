export interface EventTrace {
  eventId: string;
  commandId: string | null;
  correlationId: string | null;
  causationId: string | null;
  projectionIds: string[];
  relatedEventIds: string[];
  depth: number;
}
