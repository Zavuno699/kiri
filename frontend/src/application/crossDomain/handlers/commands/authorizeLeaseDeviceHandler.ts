import type {
  CommandHandler,
} from "../../../handlers/canonical/contracts/commandHandler";

import {
  authorizeLeaseDevice,
} from "../../leaseDevice/leaseDeviceService";

export const authorizeLeaseDeviceHandler:
  CommandHandler = {
    commandType:
      "lease-device.authorize",

    async execute(command) {
      return authorizeLeaseDevice(
        command.payload as {
          leaseId: string;
          deviceId: string;
        },
      );
    },
  };
