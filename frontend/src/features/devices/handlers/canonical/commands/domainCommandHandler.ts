import type {
  CommandHandler,
} from "../../../../application/handlers/canonical/contracts/commandHandler";

export const devicesCommandHandler:
  CommandHandler = {
    commandType:
      "devices.command",

    async execute(command) {
      return {
        accepted: true,
        domain: "devices",
        commandType:
          command.type,
      };
    },
  };
