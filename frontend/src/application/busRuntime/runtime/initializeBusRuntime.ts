import {
  registerCanonicalBuses,
} from "../registry/registerBuses";

import {
  registerCanonicalHandlers,
} from "../../handlers/canonical/runtime/registerCanonicalHandlers";

import {
  listCommandHandlers,
} from "../../handlers/canonical/registry/commandHandlerRegistry";

import {
  listQueryHandlers,
} from "../../handlers/canonical/registry/queryHandlerRegistry";

import {
  listEventHandlers,
} from "../../handlers/canonical/registry/eventHandlerRegistry";

import {
  updateBus,
} from "../registry/busRegistry";

import {
  setBusRuntimeState,
} from "../state/busRuntimeStore";

export function initializeBusRuntime(): void {
  registerCanonicalBuses();
  registerCanonicalHandlers();

  const commandCount =
    listCommandHandlers().length;

  const queryCount =
    listQueryHandlers().length;

  const eventCount =
    listEventHandlers().length;

  updateBus(
    "application.commandBus",
    {
      initialized: true,
      handlerCount:
        commandCount,
    },
  );

  updateBus(
    "application.queryBus",
    {
      initialized: true,
      handlerCount:
        queryCount,
    },
  );

  updateBus(
    "application.eventBus",
    {
      initialized: true,
      handlerCount:
        eventCount,
    },
  );

  setBusRuntimeState({
    initialized: true,
    commandHandlers:
      commandCount,
    queryHandlers:
      queryCount,
    eventHandlers:
      eventCount,
    commandReady:
      commandCount > 0,
    queryReady:
      queryCount > 0,
    eventReady:
      eventCount > 0,
    reasons: [],
  });
}
