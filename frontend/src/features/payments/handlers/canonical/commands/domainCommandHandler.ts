import type {
  CommandHandler,
} from "../../../../application/handlers/canonical/contracts/commandHandler";

export const paymentsCommandHandler:
  CommandHandler = {
    commandType:
      "payments.command",

    async execute(command) {
      return {
        accepted: true,
        domain: "payments",
        commandType:
          command.type,
      };
    },
  };
