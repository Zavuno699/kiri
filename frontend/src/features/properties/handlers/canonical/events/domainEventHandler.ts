import type {
  EventHandler,
} from "../../../../../application/handlers/canonical/contracts/eventHandler";

export const propertiesEventHandler:
  EventHandler = {
    eventType:
      "properties.event",

    async handle() {
      return;
    },
  };
