import type {
  EventEnvelope,
} from "../contracts/eventEnvelope";

import {
  appendEventRecord,
} from "../streams/eventStreamStore";

import {
  getEvent,
} from "../registry/eventRegistry";

export function publishEvent<T>(
  envelope: EventEnvelope<T>,
) {
  const definition =
    getEvent(
      envelope.eventType,
    );

  if (!definition) {
    return {
      accepted:
        false,
      record:
        null,
      reason:
        "Event type not registered",
    };
  }

  if (!definition.enabled) {
    return {
      accepted:
        false,
      record:
        null,
      reason:
        "Event type disabled",
    };
  }

  const record =
    appendEventRecord({
      envelope,
      acknowledged:
        false,
      projected:
        false,
    });

  return {
    accepted:
      true,
    record,
    reason:
      null,
  };
}
