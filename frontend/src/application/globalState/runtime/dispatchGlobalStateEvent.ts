import type {
  GlobalStateEvent,
} from "../contracts/stateEvent";

import {
  recordGlobalStateEvent,
} from "../events/globalStateEventStore";

import {
  getGlobalEventHandlers,
} from "../registry/globalEventRegistry";

import {
  updateGlobalState,
} from "../state/globalStateStore";

export async function dispatchGlobalStateEvent(
  event: GlobalStateEvent,
): Promise<void> {
  recordGlobalStateEvent(
    event,
  );

  updateGlobalState({
    lastEventId:
      event.id,
    lastEventType:
      event.type,
  });

  const handlers =
    getGlobalEventHandlers(
      event.type,
    );

  await Promise.all(
    handlers.map(
      (handler) =>
        handler(event),
    ),
  );
}
