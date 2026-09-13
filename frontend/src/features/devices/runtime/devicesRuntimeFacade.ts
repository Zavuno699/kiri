import {
  executeDevicesCommand,
} from "./commands/executeDevicesCommand";

import {
  queryDevices,
} from "./queries/queryDevices";

import {
  publishDevicesEvent,
} from "./events/publishDevicesEvent";

import {
  getDevicesRuntimeDiagnostics,
} from "./diagnostics/devicesRuntimeDiagnostics";

export const devicesRuntimeFacade = {
  executeCommand:
    executeDevicesCommand,

  query:
    queryDevices,

  publishEvent:
    publishDevicesEvent,

  diagnostics:
    getDevicesRuntimeDiagnostics,
};
