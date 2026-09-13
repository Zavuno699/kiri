import type {
  EventHandler,
} from "../../../../application/handlers/canonical/contracts/eventHandler";

export const devicesEventHandler:
  EventHandler = {
    eventType:
      "devices.event",

    async handle() {
      return;
    },
  };
