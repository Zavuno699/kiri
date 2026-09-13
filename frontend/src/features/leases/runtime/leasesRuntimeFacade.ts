import {
  executeLeasesCommand,
} from "./commands/executeLeasesCommand";

import {
  queryLeases,
} from "./queries/queryLeases";

import {
  publishLeasesEvent,
} from "./events/publishLeasesEvent";

import {
  getLeasesRuntimeDiagnostics,
} from "./diagnostics/leasesRuntimeDiagnostics";

export const leasesRuntimeFacade = {
  executeCommand:
    executeLeasesCommand,

  query:
    queryLeases,

  publishEvent:
    publishLeasesEvent,

  diagnostics:
    getLeasesRuntimeDiagnostics,
};
