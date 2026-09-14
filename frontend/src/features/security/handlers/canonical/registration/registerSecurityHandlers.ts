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
  securityCommandHandler,
} from "../commands/domainCommandHandler";

import {
  securityQueryHandler,
} from "../queries/domainQueryHandler";

import {
  securityEventHandler,
} from "../events/domainEventHandler";

export function registerSecurityHandlers(): void {
  registerCommandHandler(
    securityCommandHandler,
  );

  registerQueryHandler(
    securityQueryHandler,
  );

  registerEventHandler(
    securityEventHandler,
  );
}
