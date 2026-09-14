import type {
  CommandHandler,
} from "../../../../../application/handlers/canonical/contracts/commandHandler";

export const securityCommandHandler:
  CommandHandler = {
    commandType:
      "security.command",

    async execute(command: unknown) {
      return {
        accepted: true,
        domain: "security",
        commandType:
          (command as { type: string }).type,
      };
    },
  };
