import type {
  CommandHandler,
} from "../../../../application/handlers/canonical/contracts/commandHandler";

export const dashboardCommandHandler:
  CommandHandler = {
    commandType:
      "dashboard.command",

    async execute(command) {
      return {
        accepted: true,
        domain: "dashboard",
        commandType:
          command.type,
      };
    },
  };
