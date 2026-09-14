import type {
  EventHandler,
} from "../../../../../application/handlers/canonical/contracts/eventHandler";

export const paymentsEventHandler:
  EventHandler = {
    eventType:
      "payments.event",

    async handle() {
      return;
    },
  };
