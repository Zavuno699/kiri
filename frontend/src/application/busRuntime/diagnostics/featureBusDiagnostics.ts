import {
  listCommandHandlers,
} from "../../handlers/canonical/registry/commandHandlerRegistry";

import {
  listQueryHandlers,
} from "../../handlers/canonical/registry/queryHandlerRegistry";

import {
  listEventHandlers,
} from "../../handlers/canonical/registry/eventHandlerRegistry";

export function getFeatureBusDiagnostics() {
  return {
    commands:
      listCommandHandlers()
        .map(
          (handler) =>
            handler.commandType,
        ),
    queries:
      listQueryHandlers()
        .map(
          (handler) =>
            handler.queryType,
        ),
    events:
      listEventHandlers()
        .map(
          (handler) =>
            handler.eventType,
        ),
  };
}
