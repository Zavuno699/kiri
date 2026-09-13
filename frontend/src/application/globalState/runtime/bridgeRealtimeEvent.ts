import {
  dispatchGlobalStateEvent,
} from "./dispatchGlobalStateEvent";

import type {
  RealtimeEvent,
} from "../../realtime/contracts/realtimeEvent";

export async function bridgeRealtimeEvent(
  event: RealtimeEvent,
): Promise<void> {
  await dispatchGlobalStateEvent({
    id:
      event.eventId,
    type:
      event.eventType,
    domain:
      event.domain,
    resourceId:
      event.resourceKey,
    payload:
      event.payload,
    occurredAt:
      event.occurredAt,
    correlationId:
      event.correlationId,
    causationId:
      event.causationId,
    source:
      "realtime",
  });
}
