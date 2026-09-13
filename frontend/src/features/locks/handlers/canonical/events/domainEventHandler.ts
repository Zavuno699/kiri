import type {
  EventHandler,
} from "../../../../application/handlers/canonical/contracts/eventHandler";

export const locksEventHandler:
  EventHandler = {
    eventType:
      "locks.event",

    async handle() {
      return;
    },
  };
