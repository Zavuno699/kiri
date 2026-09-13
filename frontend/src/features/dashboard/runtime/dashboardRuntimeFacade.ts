import {
  executeDashboardCommand,
} from "./commands/executeDashboardCommand";

import {
  queryDashboard,
} from "./queries/queryDashboard";

import {
  publishDashboardEvent,
} from "./events/publishDashboardEvent";

import {
  getDashboardRuntimeDiagnostics,
} from "./diagnostics/dashboardRuntimeDiagnostics";

export const dashboardRuntimeFacade = {
  executeCommand:
    executeDashboardCommand,

  query:
    queryDashboard,

  publishEvent:
    publishDashboardEvent,

  diagnostics:
    getDashboardRuntimeDiagnostics,
};
