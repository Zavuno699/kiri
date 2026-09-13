import {
  listCommandHandlers,
} from "../registry/commandHandlerRegistry";

import {
  listQueryHandlers,
} from "../registry/queryHandlerRegistry";

import {
  listEventHandlers,
} from "../registry/eventHandlerRegistry";

export function getHandlerDiagnostics() {
  return {
    commands:
      listCommandHandlers().length,
    queries:
      listQueryHandlers().length,
    events:
      listEventHandlers().length,
  };
}
