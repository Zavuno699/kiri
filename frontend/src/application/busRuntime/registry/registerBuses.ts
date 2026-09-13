import {
  registerBus,
} from "./busRegistry";

export function registerCanonicalBuses(): void {
  registerBus({
    key: "application.commandBus",
    kind: "command",
    initialized: false,
    handlerCount: 0,
    required: true,
  });

  registerBus({
    key: "application.queryBus",
    kind: "query",
    initialized: false,
    handlerCount: 0,
    required: true,
  });

  registerBus({
    key: "application.eventBus",
    kind: "event",
    initialized: false,
    handlerCount: 0,
    required: true,
  });
}
