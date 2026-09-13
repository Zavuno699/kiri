import {
  executeLocksCommand,
} from "./commands/executeLocksCommand";

import {
  queryLocks,
} from "./queries/queryLocks";

import {
  publishLocksEvent,
} from "./events/publishLocksEvent";

import {
  getLocksRuntimeDiagnostics,
} from "./diagnostics/locksRuntimeDiagnostics";

export const locksRuntimeFacade = {
  executeCommand:
    executeLocksCommand,

  query:
    queryLocks,

  publishEvent:
    publishLocksEvent,

  diagnostics:
    getLocksRuntimeDiagnostics,
};
