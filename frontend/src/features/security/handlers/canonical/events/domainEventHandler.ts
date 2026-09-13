import type {
  EventHandler,
} from "../../../../application/handlers/canonical/contracts/eventHandler";

export const securityEventHandler:
  EventHandler = {
    eventType:
      "security.event",

    async handle() {
      return;
    },
  };
