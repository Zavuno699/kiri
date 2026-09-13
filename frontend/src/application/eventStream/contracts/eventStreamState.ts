export interface EventStreamState {
  selectedEventId: string | null;
  selectedEventType: string | null;
  selectedDomain: string | null;
  selectedAggregateId: string | null;
  correlationId: string | null;
  eventIds: string[];
  projectionIds: string[];
  relatedEventIds: string[];
  loading: boolean;
  error: string | null;
}
