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
  dashboardCommandHandler,
} from "../commands/domainCommandHandler";

import {
  dashboardQueryHandler,
} from "../queries/domainQueryHandler";

import {
  dashboardEventHandler,
} from "../events/domainEventHandler";

export function registerDashboardHandlers(): void {
  registerCommandHandler(
    dashboardCommandHandler,
  );

  registerQueryHandler(
    dashboardQueryHandler,
  );

  registerEventHandler(
    dashboardEventHandler,
  );
}
