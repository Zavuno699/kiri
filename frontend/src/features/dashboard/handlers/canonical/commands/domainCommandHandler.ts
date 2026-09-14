import type {
  CommandHandler,
} from "../../../../../application/handlers/canonical/contracts/commandHandler";

export const dashboardCommandHandler:
  CommandHandler = {
    commandType:
      "dashboard.command",

    async execute(command: unknown) {
      const cmd = command as { type: string };
      return {
        accepted: true,
        domain: "dashboard",
        commandType:
          cmd.type,
      };
    },
  };
