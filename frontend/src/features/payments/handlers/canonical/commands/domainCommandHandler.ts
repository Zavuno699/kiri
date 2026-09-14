import type {
  CommandHandler,
} from "../../../../../application/handlers/canonical/contracts/commandHandler";

export const paymentsCommandHandler:
  CommandHandler = {
    commandType:
      "payments.command",

    async execute(command: unknown) {
      const cmd = command as { type: string };
      return {
        accepted: true,
        domain: "payments",
        commandType:
          cmd.type,
      };
    },
  };
