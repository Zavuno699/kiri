import type {
  CommandHandler,
} from "../../../../../application/handlers/canonical/contracts/commandHandler";

export const devicesCommandHandler:
  CommandHandler = {
    commandType:
      "devices.command",

    async execute(command: unknown) {
      const cmd = command as { type: string };
      return {
        accepted: true,
        domain: "devices",
        commandType:
          cmd.type,
      };
    },
  };
