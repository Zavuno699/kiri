import type {
  CommandHandler,
} from "../../../../application/handlers/canonical/contracts/commandHandler";

export const securityCommandHandler:
  CommandHandler = {
    commandType:
      "security.command",

    async execute(command) {
      return {
        accepted: true,
        domain: "security",
        commandType:
          command.type,
      };
    },
  };
