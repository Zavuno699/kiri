import {
  registerCommandHandler,
} from "../../../../../application/handlers/canonical/registry/commandHandlerRegistry";

import {
  registerQueryHandler,
} from "../../../../../application/handlers/canonical/registry/queryHandlerRegistry";

import {
  registerEventHandler,
} from "../../../../../application/handlers/canonical/registry/eventHandlerRegistry";

import {
  locksCommandHandler,
} from "../commands/domainCommandHandler";

import {
  locksQueryHandler,
} from "../queries/domainQueryHandler";

import {
  locksEventHandler,
} from "../events/domainEventHandler";

export function registerLocksHandlers(): void {
  registerCommandHandler(
    locksCommandHandler,
  );

  registerQueryHandler(
    locksQueryHandler,
  );

  registerEventHandler(
    locksEventHandler,
  );
}
