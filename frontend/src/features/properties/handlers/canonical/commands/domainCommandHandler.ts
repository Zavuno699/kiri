import type {
  CommandHandler,
} from "../../../../../application/handlers/canonical/contracts/commandHandler";

export const propertiesCommandHandler:
  CommandHandler = {
    commandType:
      "properties.command",

    async execute(command: unknown) {
      const cmd = command as { type: string };
      return {
        accepted: true,
        domain: "properties",
        commandType:
          cmd.type,
      };
    },
  };
