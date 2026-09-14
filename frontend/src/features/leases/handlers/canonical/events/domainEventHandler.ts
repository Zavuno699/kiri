import type {
  EventHandler,
} from "../../../../../application/handlers/canonical/contracts/eventHandler";

export const leasesEventHandler:
  EventHandler = {
    eventType:
      "leases.event",

    async handle() {
      return;
    },
  };
