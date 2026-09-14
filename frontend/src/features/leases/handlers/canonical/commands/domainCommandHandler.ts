import type {
  CommandHandler,
} from "../../../../../application/handlers/canonical/contracts/commandHandler";

export const leasesCommandHandler:
  CommandHandler = {
    commandType:
      "leases.command",

    async execute(command: unknown) {
      const cmd = command as { type: string };
      return {
        accepted: true,
        domain: "leases",
        commandType:
          cmd.type,
      };
    },
  };
