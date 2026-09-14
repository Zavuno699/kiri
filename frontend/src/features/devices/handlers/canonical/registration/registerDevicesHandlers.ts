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
  devicesCommandHandler,
} from "../commands/domainCommandHandler";

import {
  devicesQueryHandler,
} from "../queries/domainQueryHandler";

import {
  devicesEventHandler,
} from "../events/domainEventHandler";

export function registerDevicesHandlers(): void {
  registerCommandHandler(
    devicesCommandHandler,
  );

  registerQueryHandler(
    devicesQueryHandler,
  );

  registerEventHandler(
    devicesEventHandler,
  );
}
