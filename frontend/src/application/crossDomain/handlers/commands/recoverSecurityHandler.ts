import type {
  CommandHandler,
} from "../../../handlers/canonical/contracts/commandHandler";

import {
  recoverOperatorSecurityState,
} from "../../securityRecovery/securityRecoveryService";

export const recoverSecurityHandler:
  CommandHandler = {
    commandType:
      "security.recover",

    async execute() {
      return recoverOperatorSecurityState();
    },
  };
