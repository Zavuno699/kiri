import type {
  CommandHandler,
} from "../../../../application/handlers/canonical/contracts/commandHandler";

export const leasesCommandHandler:
  CommandHandler = {
    commandType:
      "leases.command",

    async execute(command) {
      return {
        accepted: true,
        domain: "leases",
        commandType:
          command.type,
      };
    },
  };
