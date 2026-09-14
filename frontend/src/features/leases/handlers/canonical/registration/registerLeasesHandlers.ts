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
  leasesCommandHandler,
} from "../commands/domainCommandHandler";

import {
  leasesQueryHandler,
} from "../queries/domainQueryHandler";

import {
  leasesEventHandler,
} from "../events/domainEventHandler";

export function registerLeasesHandlers(): void {
  registerCommandHandler(
    leasesCommandHandler,
  );

  registerQueryHandler(
    leasesQueryHandler,
  );

  registerEventHandler(
    leasesEventHandler,
  );
}
