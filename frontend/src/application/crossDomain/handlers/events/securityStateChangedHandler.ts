import type {
  EventHandler,
} from "../../../handlers/canonical/contracts/eventHandler";

export const securityStateChangedHandler:
  EventHandler = {
    eventType:
      "security.state.changed",

    async handle() {
      return;
    },
  };
