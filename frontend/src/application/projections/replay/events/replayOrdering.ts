import type { ProjectionReplayEvent } from "./projectionReplayEvent";

export function orderReplayEvents(
  events: ProjectionReplayEvent[],
): ProjectionReplayEvent[] {
  return [...events].sort((left, right) => {
    if (left.sequence !== right.sequence) {
      return left.sequence - right.sequence;
    }

    if (left.occurredAt !== right.occurredAt) {
      return left.occurredAt.localeCompare(right.occurredAt);
    }

    return left.eventId.localeCompare(right.eventId);
  });
}
