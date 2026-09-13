import type { ProjectionReplayEvent } from "./projectionReplayEvent";

export type ReplayEventFilter = {
  aggregateType?: string;
  aggregateId?: string;
  eventTypes?: string[];
  fromSequence?: number;
  toSequence?: number;
};

export function filterReplayEvents(
  events: ProjectionReplayEvent[],
  filter: ReplayEventFilter,
): ProjectionReplayEvent[] {
  return events.filter((event) => {
    if (
      filter.aggregateType &&
      event.aggregateType !== filter.aggregateType
    ) {
      return false;
    }

    if (
      filter.aggregateId &&
      event.aggregateId !== filter.aggregateId
    ) {
      return false;
    }

    if (
      filter.eventTypes &&
      filter.eventTypes.length > 0 &&
      !filter.eventTypes.includes(event.eventType)
    ) {
      return false;
    }

    if (
      filter.fromSequence !== undefined &&
      event.sequence < filter.fromSequence
    ) {
      return false;
    }

    if (
      filter.toSequence !== undefined &&
      event.sequence > filter.toSequence
    ) {
      return false;
    }

    return true;
  });
}
