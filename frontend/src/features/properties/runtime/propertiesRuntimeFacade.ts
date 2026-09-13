import {
  executePropertiesCommand,
} from "./commands/executePropertiesCommand";

import {
  queryProperties,
} from "./queries/queryProperties";

import {
  publishPropertiesEvent,
} from "./events/publishPropertiesEvent";

import {
  getPropertiesRuntimeDiagnostics,
} from "./diagnostics/propertiesRuntimeDiagnostics";

export const propertiesRuntimeFacade = {
  executeCommand:
    executePropertiesCommand,

  query:
    queryProperties,

  publishEvent:
    publishPropertiesEvent,

  diagnostics:
    getPropertiesRuntimeDiagnostics,
};
