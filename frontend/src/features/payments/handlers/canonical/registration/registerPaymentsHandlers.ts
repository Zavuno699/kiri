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
  paymentsCommandHandler,
} from "../commands/domainCommandHandler";

import {
  paymentsQueryHandler,
} from "../queries/domainQueryHandler";

import {
  paymentsEventHandler,
} from "../events/domainEventHandler";

export function registerPaymentsHandlers(): void {
  registerCommandHandler(
    paymentsCommandHandler,
  );

  registerQueryHandler(
    paymentsQueryHandler,
  );

  registerEventHandler(
    paymentsEventHandler,
  );
}
