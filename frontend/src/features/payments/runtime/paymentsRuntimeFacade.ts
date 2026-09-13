import {
  executePaymentsCommand,
} from "./commands/executePaymentsCommand";

import {
  queryPayments,
} from "./queries/queryPayments";

import {
  publishPaymentsEvent,
} from "./events/publishPaymentsEvent";

import {
  getPaymentsRuntimeDiagnostics,
} from "./diagnostics/paymentsRuntimeDiagnostics";

export const paymentsRuntimeFacade = {
  executeCommand:
    executePaymentsCommand,

  query:
    queryPayments,

  publishEvent:
    publishPaymentsEvent,

  diagnostics:
    getPaymentsRuntimeDiagnostics,
};
