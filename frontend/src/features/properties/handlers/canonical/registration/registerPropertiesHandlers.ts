import {
  registerCommandHandler,
} from "../../../../application/handlers/canonical/registry/commandHandlerRegistry";

import {
  registerQueryHandler,
} from "../../../../application/handlers/canonical/registry/queryHandlerRegistry";

import {
  registerEventHandler,
} from "../../../../application/handlers/canonical/registry/eventHandlerRegistry";

import {
  propertiesCommandHandler,
} from "../commands/domainCommandHandler";

import {
  propertiesQueryHandler,
} from "../queries/domainQueryHandler";

import {
  propertiesEventHandler,
} from "../events/domainEventHandler";

export function registerPropertiesHandlers(): void {
  registerCommandHandler(
    propertiesCommandHandler,
  );

  registerQueryHandler(
    propertiesQueryHandler,
  );

  registerEventHandler(
    propertiesEventHandler,
  );
}
