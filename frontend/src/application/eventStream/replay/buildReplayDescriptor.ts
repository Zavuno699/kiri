import type {
  EventReplayDescriptor,
} from "../contracts/eventReplayDescriptor";

import {
  getEventRecord,
} from "../streams/eventStreamStore";

export function buildReplayDescriptor(
  eventId: string,
): EventReplayDescriptor {
  const record =
    getEventRecord(
      eventId,
    );

  if (!record) {
    return {
      eventId,
      eventType:
        "unknown",
      replayable:
        false,
      requiresAuthorization:
        true,
      requiresConfirmation:
        true,
      blockedReason:
        "Event not found",
    };
  }

  const category =
    record.envelope
      .eventType
      .startsWith(
        "security.",
      )
      ? "critical"
      : record.envelope
          .eventType
          .startsWith(
            "lock.",
          )
        ? "high"
        : "normal";

  if (
    category ===
    "critical"
  ) {
    return {
      eventId,
      eventType:
        record.envelope
          .eventType,
      replayable:
        false,
      requiresAuthorization:
        true,
      requiresConfirmation:
        true,
      blockedReason:
        "Security events are not replayed by the frontend control surface",
    };
  }

  return {
    eventId,
    eventType:
      record.envelope
        .eventType,
    replayable:
      true,
    requiresAuthorization:
      true,
    requiresConfirmation:
      true,
    blockedReason:
      null,
  };
}
