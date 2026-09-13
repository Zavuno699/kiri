import type {
  CommandHandler,
} from "../../../../application/handlers/canonical/contracts/commandHandler";

export const locksCommandHandler:
  CommandHandler = {
    commandType:
      "locks.command",

    async execute(command) {
      return {
        accepted: true,
        domain: "locks",
        commandType:
          command.type,
      };
    },
  };
