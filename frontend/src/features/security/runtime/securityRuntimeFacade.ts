import {
  executeSecurityCommand,
} from "./commands/executeSecurityCommand";

import {
  querySecurity,
} from "./queries/querySecurity";

import {
  publishSecurityEvent,
} from "./events/publishSecurityEvent";

import {
  getSecurityRuntimeDiagnostics,
} from "./diagnostics/securityRuntimeDiagnostics";

export const securityRuntimeFacade = {
  executeCommand:
    executeSecurityCommand,

  query:
    querySecurity,

  publishEvent:
    publishSecurityEvent,

  diagnostics:
    getSecurityRuntimeDiagnostics,
};
