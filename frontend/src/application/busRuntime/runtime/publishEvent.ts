import type {
  ApplicationEvent,
} from "../../handlers/canonical/contracts/event";

import {
  publishEvent as publishCanonicalEvent,
} from "../../handlers/canonical/bus/eventBus";

import {
  recordOperatorAudit,
} from "../../audit/events/recordOperatorAudit";

export async function publishApplicationEvent(
  event: ApplicationEvent,
): Promise<void> {
  await publishCanonicalEvent(
    event,
  );

  recordOperatorAudit({
    action:
      `event:${event.type}`,
    outcome: "success",
    principal: null,
    sessionId: null,
    metadata: {
      eventId:
        event.eventId,
      correlationId:
        event.correlationId ??
        null,
    },
  });
}
