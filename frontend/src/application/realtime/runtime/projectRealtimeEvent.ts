import {
  applyProjection,
} from "../../projections/runtime/applyProjection";

import {
  writePersistence,
} from "../../persistence/runtime/writePersistence";

import type {
  RealtimeEvent,
} from "../contracts/realtimeEvent";

export function projectRealtimeEvent(
  event: RealtimeEvent,
): void {
  applyProjection({
    domain:
      event.domain,

    resourceKey:
      event.resourceKey,

    payload:
      event.payload,

    source:
      "event",

    receivedAt:
      new Date().toISOString(),
  });

  writePersistence(
    `${event.domain}:${event.resourceKey}`,
    event.payload,
  );
}
