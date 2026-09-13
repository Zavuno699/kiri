import type {
  CommandHandler,
} from "../../../../application/handlers/canonical/contracts/commandHandler";

export const propertiesCommandHandler:
  CommandHandler = {
    commandType:
      "properties.command",

    async execute(command) {
      return {
        accepted: true,
        domain: "properties",
        commandType:
          command.type,
      };
    },
  };
