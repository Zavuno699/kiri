import type {
  CommandHandler,
} from "../../../../../application/handlers/canonical/contracts/commandHandler";

export const locksCommandHandler:
  CommandHandler = {
    commandType:
      "locks.command",

    async execute(command: unknown) {
      const cmd = command as { type: string };
      return {
        accepted: true,
        domain: "locks",
        commandType:
          cmd.type,
      };
    },
  };
