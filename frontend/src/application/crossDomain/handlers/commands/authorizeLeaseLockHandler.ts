import type {
  CommandHandler,
} from "../../../handlers/canonical/contracts/commandHandler";

import {
  authorizeLeaseLock,
} from "../../leaseLock/leaseLockService";

export const authorizeLeaseLockHandler:
  CommandHandler = {
    commandType:
      "lease-lock.authorize",

    async execute(command) {
      return authorizeLeaseLock(
        command.payload as {
          leaseId: string;
          lockId: string;
        },
      );
    },
  };
