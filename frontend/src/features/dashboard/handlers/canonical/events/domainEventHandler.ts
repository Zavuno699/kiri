import type {
  EventHandler,
} from "../../../../application/handlers/canonical/contracts/eventHandler";

export const dashboardEventHandler:
  EventHandler = {
    eventType:
      "dashboard.event",

    async handle() {
      return;
    },
  };
